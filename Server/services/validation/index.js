const validator = require("validator");

/* Parameters
 *   USER = parameter is the user object
 *   for which a new user with be created
 *   with the values: firtst/last name
 *   email, password and mobile #
 */

async function validateNewUser(user) {
  console.log(user);

  //WORKING HERE TRYING TO VALIDATE INCASE KEYS ARE NOT FILLED OUT/
  if (
    !user.hasOwnProperty("email") ||
    !user.hasOwnProperty("password") ||
    !user.hasOwnProperty("avatar") ||
    !user.hasOwnProperty("name") ||
    !user.hasOwnProperty("lastName") ||
    !user.hasOwnProperty("mobileNumber") ||
    !user.hasOwnProperty("location") ||
    !user.hasOwnProperty("status")
  ) {
    console.error("Missing keys: ", user);
    return {
      success: false,
      message:
        "Unsuccessful operation request: CREATE NEW USER due to missing keys"
    };
  }

  var newUser = {
    email: validator.trim(user.email),
    password: user.password,
    avatar: validator.trim(user.avatar),
    name: validator.trim(user.name),
    lastName: validator.trim(user.lastName),
    mobileNumber: validator.trim(user.mobileNumber),
    status: validator.trim(user.status),
    location: {
      type: user.location.type,
      coordinates: user.location.coordinates
    }
  };

  console.log(newUser);

  var response = {
    success: true,
    message: "Validated successfully.",
    user: newUser
  };

  //Email Validation
  if (validator.isEmpty(newUser.email) || !validator.isEmail(newUser.email)) {
    response.success = false;
    response.message = "Email is either empty or invalid.";
    return response;
  }

  //Password Validation
  if (
    validator.isEmpty(newUser.password) ||
    !validator.isLength(newUser.password, { min: 6, max: 20 })
  ) {
    response.success = false;
    response.message =
      "Password cannot be empty and must contain atleast 6 characters.";
    return response;
  }

  //First Name Validation
  if (
    validator.isEmpty(newUser.name) ||
    !validator.isAlpha(newUser.name, "en-US")
  ) {
    response.success = false;
    response.message = "Check your first name again";
    return response;
  }

  //Last Name Validation
  if (
    validator.isEmpty(newUser.lastName) ||
    !validator.isAlpha(newUser.lastName, "en-US")
  ) {
    response.success = false;
    response.message = "Check your last name again";
    return response;
  }

  //Status
  if (validator.isEmpty(newUser.status)) {
    response.success = false;
    response.message =
      'Check status field, include attribute either "OFFLINE" or "ONLINE"';
    return response;
  }

  //Mobile phone number
  // if (validator.isEmpty(newUser.mobileNumber) || !validator.isMobilePhone('+' + newUser.mobileNumber, 'any', {strictMode: true})) {
  //     response.success = false;
  //     response.message = 'Check your phone number, include country code';
  //     return (response);
  // }

  // //Point
  // if (validator.isEmpty(newUser.location.type) || newUser.location.type !== 'Point') {
  //     response.success = false;
  //     response.message = 'Check status field, must be of type "Point"';
  //     return (response);
  // }

  return response;
}

async function sanitizeField(field) {
  var sanitizedField = validator.trim(field);
  sanitizedField = validator.blacklist(sanitizedField, "\\[\\]");
  sanitizedField = validator.escape(sanitizedField);

  console.log(sanitizedField);

  return sanitizedField;
}

module.exports.validateNewUser = validateNewUser;
module.exports.sanitizeField = sanitizeField;
