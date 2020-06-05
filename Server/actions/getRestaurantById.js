const mongoose = require("mongoose");
const Restaurants = mongoose.model("Restaurant");
const axios = require("axios");

/* Parameters
 *   id = filter by id/email or unique key
 *   field = field on the User schema to update
 *   value = the value to update to
 */

/* @TODO
 *   Add code inside a try/catch block
 *   Return error incase operation not successful
 */

module.exports = async function getRestaurantById(rid) {
  console.log(rid);
  var results = {};
  // Get the restaurant details
  try {
    var restaurant = await Restaurants.findOne({
      _id: rid,
    });
    // Sanitize phone number for yelp and remove unneccasary characters.
    var phoneNumber = restaurant.phone;
    phoneNumber = phoneNumber.replace("+1", "");
    phoneNumber = phoneNumber.replace("(", "");
    phoneNumber = phoneNumber.replace(")", "");
    phoneNumber = phoneNumber.replace("-", "");
    phoneNumber = phoneNumber.replace(" ", "");

    // Config object for yelp
    var options = {
      method: "GET",
      url: `https://api.yelp.com/v3/businesses/search/phone?phone=+1${phoneNumber}`,
      headers: {
        Authorization:
          "Bearer kfds5vXtOV8wgR9Rvo8ScjUB8IDLhScYsWViW3tiiSvdBs81aOr7dhzJ8uBlNzjpaoqrlloUs8ai1c5nKoNu_HswbQnEImHXfdv0HQphuRAnD2P4v_Cqk6LztvnPXnYx",
      },
    };

    // Data returned from yelp
    const yelpData = await axios(options);

    console.log(restaurant);
    console.log(yelpData);

    results.extra = yelpData.data;

    console.log(restaurant);

    return restaurant;
  } catch (e) {
    console.log(e);
    // If error return error
    return e;
  }
};
