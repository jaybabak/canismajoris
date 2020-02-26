import AsyncStorage from "@react-native-community/async-storage";
const axios = require("axios");

const getStorageData = async function(key) {
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

/**
 * Grabs nearby restaurants
 * @param {string} accesstoken Pass a valid accesstokent to retieve the current user
 * @param {string} lat Pass a valid latitude coordinate
 * @param {string} long Pass a valid longitutde coordinate
 */
const getRestaurants = async function() {
  const accessToken = await getStorageData("@app_access_token");
  // console.log(accessToken);

  //HTTP Request object
  const settings = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
    url: "http://localhost:3000/api/get-restaurants"
  };

  //Make the requst
  const items = await axios(settings);

  if (items.status !== 200) {
    items.errors = {
      status: "Something unexpected occured" + items.status + "."
    };
  }
  //Return the user object returned from server
  return items;
};

module.exports.getRestaurants = getRestaurants;
