import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isAlpha from "validator/lib/isAlpha";
const axios = require("axios");

/**
 * Validate login form - Validates the user login form
 * @param {string} user This is the user object being passed to the validate function
 */
const validate = async function (form) {
  var errors = {
    success: true,
    email: false,
    city: false,
    name: false,
  };

  //Email Validation
  if (isEmpty(form.email) || !isEmail(form.email)) {
    console.log("Incorrect email");
    errors.email = true;
    errors.success = false;
  }

  //Name Validation
  if (isEmpty(form.name) || !isLength(form.name, { min: 2, max: 30 })) {
    console.log("incorrect name must be between 2 and 30");
    errors.name = true;
    errors.success = false;
  }

  //City Validation
  if (isEmpty(form.city) || !isLength(form.city, { min: 2, max: 30 })) {
    console.log("incorrect city name must be between 2 and 30");
    errors.city = true;
    errors.success = false;
  }

  return errors;
};

/**
 * Create user method - Registers the user and creates a new user in the database
 * @param {string} user This is the user object being passed
 */
const submit = async function (form) {
  console.log(form);
  var submitUserForm;

  try {
    //HTTP Request object
    const settings = {
      method: "post",
      url: "http://localhost:3000/optin",
      data: {
        name: form.name,
        email: form.email,
        city: form.city,
      },
    };
    //Make the requst
    submitUserForm = await axios(settings);
    //Return the user object returned from server along with the access token
    return submitUserForm;
  } catch (e) {
    console.log(e);
  }
};

module.exports.validate = validate;
module.exports.submit = submit;
