const updateUser = require("../../actions/updateUser");

module.exports = async function updateUserWithEmail(req, res) {
  try {
    // User must be from authorised user coming with the same email.
    if (req.user.email !== req.body.email) {
      return res.status(401).end();
    }

    // Call the update user action.
    var userObject = await updateUser(
      req.body.email,
      req.body.field,
      req.body.value
    );

    // No user with that email found.
    if (userObject == null) {
      return res.json({
        message:
          "Error updating user or a user cannot be found with that email.",
        success: false,
      });
    }

    // User FOUND and updated.
    return res.json({
      message: `User with the email address [${req.body.email}], updated ${req.body.field} with values: ${req.body.value}.`,
      success: true,
    });
  } catch (e) {
    // Console the error.
    console.log(e);
    // Return the error response.
    return res.json({
      message: "Unable to update user due to error.",
      success: false,
    });
  }
};
