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
  // The user that will be updated.
  const filter = { email: email };
  var update = {};

  // If location field, alter the update method.
  if (field === "location") {
    update = {
      location: {
        type: "Point",
        coordinates: [value[0], value[1]], //longitude first and latitude second
      },
    };
  } else {
    // Update the field with the value from params.
    update[field] = value;
  }

  try {
    let updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    // Returns null if no user found.
    return updatedUser;
  } catch (e) {
    // Console the error.
    console.log(e);
    // Return the error.
    return e;
  }
};
