import { Linking, Platform } from "react-native";

/**
 * Grabs nearby restaurants
 * @param {string} phoneNumbers Pass a valid accesstokent to retieve the current user
 */
const makeCall = function(phoneNumbers) {
  let phoneNumber = "";

  if (Platform.OS === "android") {
    phoneNumber = "tel:${1234567890}";
  } else {
    phoneNumber = "telprompt:${1234567890}";
  }

  Linking.openURL(phoneNumber);
};

module.exports.makeCall = makeCall;
