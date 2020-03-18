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
    //create the voximplant user account and password
    var accountId = "3126587";
    var apiKey = "8c7b1e30-29bf-4230-a00f-743ea324f3d5";
    var applicationId = "4293142";
    var userPassword = userModel.id;
    var userId = userModel.id;
    var displayName = encodeURIComponent(
      `${userModel.name} ${userModel.lastName}`
    );

    const createVoxUser = await axios.get(
      `https://api.voximplant.com/platform_api/AddUser/?account_id=${accountId}&api_key=${apiKey}&user_name=${userId}&user_display_name=${displayName}&user_password=${userPassword}&application_id=${applicationId}`
    );

    var update = await updateUser(
      userModel.email,
      "voximplantId",
      createVoxUser.data.user_id
    );

    return res.json({
      success: true,
      message: "Registered user successfully !",
      name: update.name + " " + update.lastName
    });
  } catch (e) {
    console.error(e);
    res.json({
      success: false,
      message: e
    });
  }
  console.log("REQUEST: ", req);
};
