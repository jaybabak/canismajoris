const mongoose = require("mongoose");
const User = mongoose.model("User");

/* Parameters
 *   id = filter by id/email or unique key
 *   field = field on the User schema to update
 *   value = the value to update to
 */

/* @TODO
 *   Add code inside a try/catch block
 *   Return error incase operation not successful
 */

module.exports = async function updateUser(email, field, value) {
  const filter = { email: email };
  var update = {};

  if (field === "location") {
    update = {
      location: {
        type: "Point",
        coordinates: [value[0], value[1]] //longitude first and latitude second
      }
    };
  } else {
    update[field] = value;
  }

  let updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true
  });

  if (updatedUser == null) {
    console.log("UPDATE_USER_FAILED");
  } else {
    console.log("UPDATE_USER_SUCCESSFUL: ", email, field, value);
  }

  //returns null if no user found
  return updatedUser;
};
