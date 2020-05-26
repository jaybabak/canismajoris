const mongoose = require("mongoose");
const User = mongoose.model("User");
const axios = require("axios");
const updateUser = require("./updateUser");
const validationService = require("../services/validation");

/* Parameters
 *   REQ = {string} req which holds the data for the new user
 *   to be created, passed to validatNewUser method.
 *   Creates the voximplant user as well.
 *   RES = contains the response object from parent route
 *   "/register-user"
 */

module.exports = async function addUser(req, res) {
  //Validating the user object being passed from front end
  var newUser = await validationService.validateNewUser(req.body.user);
  console.log(newUser);

  //if form is not valid throw error back
  if (newUser.success !== true) {
    return res.json(newUser);
  }

  //Save the user -> literally though
  let userModel = new User(newUser.user);

  try {
    //save user object after validation has occurred in previous step
    userModel = await userModel.save();

    // Return new user object
    return res.json({
      success: true,
      message: "Registered user successfully !",
      name: `${userModel.name} ${userModel.lastName}`,
    });
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
      message: e,
    });
  }
  console.log("REQUEST: ", req);
};
