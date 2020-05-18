const updateUser = require("../../actions/updateUser");

module.exports = async function updateUserWithEmail(req, res) {
  try {
    //user must be from authorised user coming with the same email
    //correct access token
    if (req.user.email !== req.body.email) {
      return res.status(401).end();
    }

    var userObject = await updateUser(
      req.body.email,
      req.body.field,
      req.body.value
    );

    if (userObject == null) {
      return res.json({
        message:
          "Error updating user or a user cannot be found with that email.",
        success: false,
      });
    } else {
      return res.json({
        message: `User with the email address [${req.body.email}], updated ${req.body.field} with values: ${req.body.value}.`,
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    return res.json({
      message: "Unable to update user due to error.",
      success: false,
    });
  }
};
