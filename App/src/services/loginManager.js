import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isAlpha from "validator/lib/isAlpha";
import isNumeric from "validator/lib/isNumeric";
const axios = require("axios");

/**
 * Login and set tokem to local storage
 * @param {string} that The current state object from the higher order component (App.js?)
 */
const authenticate = async function (that) {
  try {
    //If successful login to voximplant service than proceed to set the accesstoken, refresh etc..
    const userName = ["@id", that.state.user._id];

    //Asyncronoushly set all the above values to the AsyncStorage
    await AsyncStorage.multiSet([userName]);

    //Update the state and the UI to show the authenticated screens
    that.setState({
      tokens: true,
    });

    return true;
  } catch (e) {
    //Console and alert the error message if something goes wrong
    console.log(e.name + e.message);
    console.log(e);

    Alert.alert(
      "Oops!",
      "Error connecting to the service provider. Please try again later.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );

    that.setState({
      authenticated: false,
      isReady: true,
    });

    return false;
  }
};

/**
 * Create user method - Registers the user and creates a new user in the database
 * @param {string} user This is the user object being passed
 */
const addUser = async function (user) {
  var submitUserForm;
  try {
    //HTTP Request object
    const settings = {
      method: "post",
      url: "https://jyze.net/register-user",
      data: {
        user,
      },
    };
    //Make the requst
    submitUserForm = await axios(settings);

    console.log(submitUserForm);
    //Return the user object returned from server along with the access token
    return submitUserForm;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Authenticated User Route - Grabs current user and all non-sensitive fields
 * @param {string} accesstoken Pass a valid accesstokent to retieve the current user
 */
const getUser = async function (accessToken) {
  //HTTP Request object
  const settings = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
    url: "https://jyze.net/api/home",
  };

  try {
    //Make the requst
    const submitGetUser = await axios(settings);
    //Return the user object returned from server
    return submitGetUser;
  } catch (e) {
    console.log("Unable to reach server.", e);
    return false;
  }
};

/**
 * Validate registration form - Validates the user fields such as email, password, number etc..
 * @param {string} user This is the user object being passed to the validate function
 */
const validateUser = async function (user) {
  var errors = {
    success: true,
    email: false,
    password: false,
    name: false,
    lastName: false,
    mobileNumber: false,
  };

  //Email Validation
  if (isEmpty(user.email) || !isEmail(user.email)) {
    console.log("incorrect email");
    errors.email = true;
    errors.success = false;
  }

  //Password Validation
  if (
    isEmpty(user.password) ||
    !isLength(user.password, { min: 6, max: 20 }) ||
    isAlpha(user.password) ||
    isNumeric(user.password, { no_symbols: true })
  ) {
    console.log("incorrect password must be between 6 and 20 characters");
    errors.password = true;
    errors.success = false;
  }

  //First Name Validation
  if (
    isEmpty(user.name) ||
    !isAlpha(user.name, "en-US") ||
    !isLength(user.name, { min: 2, max: 30 })
  ) {
    console.log("incorrect first name between 2 and 30");
    errors.name = true;
    errors.success = false;
  }

  //Last Name Validation
  if (
    isEmpty(user.lastName) ||
    !isAlpha(user.lastName, "en-US") ||
    !isLength(user.lastName, { min: 2, max: 30 })
  ) {
    console.log("incorrect last name between 2 and 30");
    errors.lastName = true;
    errors.success = false;
  }

  return errors;
};

/**
 * Validate login form - Validates the user login form
 * @param {string} user This is the user object being passed to the validate function
 */
const validateLoginForm = async function (user) {
  var errors = {
    success: true,
    email: false,
    password: false,
  };

  //Email Validation
  if (isEmpty(user.email) || !isEmail(user.email)) {
    console.log("Incorrect email");
    errors.email = true;
    errors.success = false;
  }

  //Password Validation
  if (isEmpty(user.password) || !isLength(user.password, { min: 6, max: 20 })) {
    console.log("Incorrect password, must be between 6 and 20 characters");
    errors.password = true;
    errors.success = false;
  }

  return errors;
};

/**
 * Login user method - Logs the user into the app:
 * @param {string} email This is the id/email of the user currently logging in.
 * @param {string} password The users existing password to succesfully login
 * @param {string} that The current state object from the higher order component (App.js?)
 */
const loginUser = async function (email, password, that) {
  //Validate the user email and password fields
  var form = await validateLoginForm(that.state);

  //If form has issues or not successful, notify the user with alert message
  if (!form.success) {
    Alert.alert(
      "Oops!",
      "Must enter a valid email and password",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
    return form;
  }

  //HTTP Request object to authenticate user
  const settings = {
    method: "post",
    url: "https://jyze.net/login",
    data: {
      email: email,
      password: password,
    },
  };

  //Make the request
  const submitLoginForm = await axios(settings);

  //If successful
  if (submitLoginForm.data.success) {
    //Console if successful login and set the access token recieved from server
    console.log(submitLoginForm);
    try {
      await AsyncStorage.setItem(
        "@app_access_token",
        submitLoginForm.data.accessToken
      );
    } catch (err) {
      console.log(err);
    }

    return submitLoginForm.data;
  } else {
    //Notify if credentials are incorrect
    Alert.alert(
      "Sorry incorrect credentials",
      "Either the user or password did not match with our records, try again.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
    return submitLoginForm.data;
  }
};

/**
 * Update user method - Update the user value input:
 * @param {string} email This is the id/email of the user you would like to update.
 * @param {string} field This is the field that you would like to be updated: location, email, etc...
 * @param {string} value The value that you will like to replace the existing field value with.
 */
const updateUser = async function (email, field, value) {
  try {
    //Must have a valid access-token to ensure client is logged in
    const accessToken = await AsyncStorage.getItem("@app_access_token");

    //HTTP Request object
    const settings = {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "post",
      url: "https://jyze.net/api/update",
      data: {
        email: email,
        field: field,
        value: value,
      },
    };

    //Make the request
    const submitUpdateForm = await axios(settings);
    //Return the data
    return submitUpdateForm.data;
  } catch (err) {
    //Alert the user incase something went wrong
    Alert.alert(
      "Error",
      "Unable to update user location fields longitude and lattitude.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );

    console.log(err);
  }
};

const getStorageData = async function (key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const setStorageData = async function (key, storeValue) {
  try {
    const value = await AsyncStorage.setItem(key, storeValue);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

const clearAsyncStorage = async function () {
  AsyncStorage.clear();
};

module.exports.authenticate = authenticate;
module.exports.getUser = getUser;
module.exports.loginUser = loginUser;
module.exports.addUser = addUser;
module.exports.validateUser = validateUser;
module.exports.updateUser = updateUser;
module.exports.getStorageData = getStorageData;
module.exports.setStorageData = setStorageData;
module.exports.clearAsyncStorage = clearAsyncStorage;
