import { Linking, Platform, Alert } from "react-native";

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

module.exports.makeCall = makeCall;
module.exports.openUrl = openUrl;
