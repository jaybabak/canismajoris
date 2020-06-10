import AsyncStorage from "@react-native-community/async-storage";
const axios = require("axios");

/**
 * Grabs nearby restaurants
 * @param {string} key Pass the key value to retrieve a config object from session storage.
 */
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

/**
 * Grabs nearby restaurants
 * @param {string} accesstoken Pass a valid accesstokent to retieve the current user
 * @param {string} lat Pass a valid latitude coordinate
 * @param {string} long Pass a valid longitutde coordinate
 */
const getRestaurants = async function (location) {
  // Determine if user is authenticated.
  const accessToken = await getStorageData("@app_access_token");
  // HTTP request object.
  var settings = {};
  // Return this variable with all restaurant data.
  var items = {};

  // If user is not logged in.
  if (accessToken === null) {
    settings = {
      headers: {
        key: `4ffbf1f99f5e17dadc8db354c369ed8756da6c6ecdadafcddf288e1ee218d327`,
      },
      method: "get",
      url: `http://localhost:3000/restaurants/${location.lon}/${location.lat}`,
    };
    //Make the requst
    items = await axios(settings);
  } else {
    //HTTP Request object
    settings = {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "get",
      url: "http://localhost:3000/api/get-restaurants",
    };

    //Make the requst
    items = await axios(settings);
  }

  // If error occured.
  if (items.status !== 200) {
    items.errors = {
      status: "Something unexpected occured" + items.status + ".",
    };
  }
  //Return the user object returned from server
  return items;
};

/**
 * Grabs nearby restaurants
 * @param {string} restaurantId Pass a valid id to retieve information about a restaurant.
 */
const getRestaurantById = async function (restaurantId) {
  // Determine if user is authenticated.
  const accessToken = await getStorageData("@app_access_token");
  // HTTP request object.
  var settings = {};
  // Return this variable with all restaurant data.
  var item = {};

  // If user is not logged in.
  if (accessToken === null) {
    //HTTP Request object
    settings = {
      headers: {
        key: `4ffbf1f99f5e17dadc8db354c369ed8756da6c6ecdadafcddf288e1ee218d327`,
      },
      method: "get",
      url: `http://localhost:3000/restaurant/${restaurantId}`,
    };

    //Make the requst
    item = await axios(settings);
  } else {
    //HTTP Request object
    settings = {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "get",
      url: `http://localhost:3000/api/restaurant/${restaurantId}`,
    };

    //Make the requst
    item = await axios(settings);
  }

  // If error occured.
  if (item.status !== 200) {
    items.errors = {
      status: "Something unexpected occured" + items.status + ".",
    };
  }
  //Return the user object returned from server
  return item;
};

module.exports.getRestaurants = getRestaurants;
module.exports.getRestaurantById = getRestaurantById;
