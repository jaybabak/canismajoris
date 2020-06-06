const mongoose = require("mongoose");
const User = mongoose.model("User");
const validationService = require("../services/validation");
const emailService = require("../services/email");

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

  // If form is not valid throw error back.
  if (newUser.success !== true) {
    return res.json(newUser);
  }

  // Save the user -> literally though.
  let userModel = new User(newUser.user);

  try {
    // Save user object after validation has occurred in previous step.
    userModel = await userModel.save();

    // Send welcome email to user.
    await emailService.sendEmail(
      newUser.user.email,
      "contact@jyze.net",
      "Thank you for registering!",
      `<h1>${newUser.user.name}, thank you for registering with us!</h1><div><h3>We hope you enjoy our service!</h3></div><div style="color:c9c9c9;">Copyright Jyze.net | Find Halal Food Near You 2019. All Rights Reserved. Ottawa, Canada.</div>`
    );

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
