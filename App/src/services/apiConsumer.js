import AsyncStorage from "@react-native-community/async-storage";
const axios = require("axios");

/**
 * Grabs nearby restaurants
 * @param {string} key Pass the key value to retrieve a config object from session storage.
 */
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

/**
 * Grabs nearby restaurants
 * @param {string} restaurantId Pass a valid id to retieve information about a restaurant.
 */
const getRestaurantById = async function(restaurantId) {
  const accessToken = await getStorageData("@app_access_token");

  //HTTP Request object
  const settings = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
    url: `http://localhost:3000/api/restaurant/${restaurantId}`
  };

  //Make the requst
  const item = await axios(settings);

  if (item.status !== 200) {
    items.errors = {
      status: "Something unexpected occured" + items.status + "."
    };
  }
  //Return the user object returned from server
  return item;
};

module.exports.getRestaurants = getRestaurants;
module.exports.getRestaurantById = getRestaurantById;
