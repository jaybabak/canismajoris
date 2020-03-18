const config = require("../config");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* Parameters
 *   email = filter by id/email or unique key
 *   password = field on the User schema to update
 */

module.exports = async function loginUser(req, res) {
  const filter = { email: req.body.email };

  User.find(filter, function(err, user) {
    if (err) {
      console.error(err);
      res.json({
        success: false,
        message: err
      });
    }

    if (user.length === 0) {
      const error = new Error("Incorrect email or password");
      error.name = "IncorrectCredentialsError";

      console.log(error.name, error);

      return res.json({
        success: false,
        message: error
      });
    }

    // Load hash from your password DB.
    bcrypt
      .compare(req.body.password, user[0].password)
      .then(function(resp) {
        //If password matches the hashed password from db
        if (resp == true) {
          //generate token and send back for storing on local device
          jwt.sign(
            { id: user[0].id },
            config.secret,
            { algorithm: "HS256" },
            function(err, token) {
              if (err) {
                console.log(err);
                return res.json({
                  success: false,
                  message: `Unable to generate token due to ${err}`
                });
              }
              return res.json({
                success: true,
                accessToken: token
              });
            }
          );
        } else {
          //Password does not match - resp != true
          return res.json({
            success: false,
            message: "Password does not match."
          });
        }
      })
      .catch(function(e) {
        console.log(e);
        return res.json({
          success: false,
          message: e
        });
      });
  });
};
