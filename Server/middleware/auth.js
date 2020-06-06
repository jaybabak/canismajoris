const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");
const config = require("../config");
const validator = require("validator");

/* The Auth Checker middleware function.
 *  - validates and verifies the token sent from client
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // Get the last part from a authorization header string like "bearer token-value".
  const token = req.headers.authorization.split(" ")[1];
  //end if not valid token
  if (!validator.isJWT(token)) {
    return res.status(401).end();
  }

  // Decode the token using a secret key-phrase.
  jwt.verify(token, config.secret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.id;
    // Check if a user exists, omit password and updated foeld to response.
    User.findById(userId, "-password -updatedAt", (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // Pass user details onto next route.
      req.user = user;
      return next();
    });
  });
};
