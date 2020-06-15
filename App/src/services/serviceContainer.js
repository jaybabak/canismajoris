import { Linking, Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

/**
 * Makes the call
 * @param {string} phoneNumbers Pass a valid accesstokent to retieve the current user
 */
const makeCall = async function (phoneNumbers) {
  let phoneNumber = "";
  phoneNumber = `tel:${phoneNumbers}`;

  // Confirmation dialog
  Alert.alert(
    "Call",
    `Place call to ${phoneNumbers}?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Call",
        onPress: async () => {
          try {
            // Attempt to make call
            await Linking.openURL(phoneNumber);
          } catch (e) {
            // Return another alert incase call failed.
            Alert.alert(
              "Sorry!",
              "Could not process the outgoing call.",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ],
              { cancelable: true }
            );
          }
        },
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
};

/**
 * Makes the call
 * @param {string} phoneNumbers Pass a valid accesstokent to retieve the current user
 */
const openUrl = async function (url) {
  let websiteUri = "";
  console.log(url);

  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      // Return another alert incase call failed.
      Alert.alert(
        "Sorry!",
        "Could not process the outgoing call.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: true }
      );
    }
  });
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

module.exports.makeCall = makeCall;
module.exports.openUrl = openUrl;
module.exports.getStorageData = getStorageData;
module.exports.setStorageData = setStorageData;
