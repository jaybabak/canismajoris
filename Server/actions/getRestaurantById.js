const mongoose = require("mongoose");
const Restaurants = mongoose.model("Restaurant");
const City = mongoose.model("City");

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

  // Get the restaurant details
  var restaurant = await Restaurants.findOne({
    _id: rid
  });

  console.log(restaurant);

  results = restaurant;

  return results;
};
