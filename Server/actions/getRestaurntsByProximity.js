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

module.exports = async function getByLatLong(long, lat) {
  console.log(lat, long);

  // Get the user's neighborhood/city
  // var city = await City.findOne({
  //   geometry: {
  //     $geoIntersects: {
  //       $geometry: { type: "Point", coordinates: [long, lat] }
  //     }
  //   }
  // });

  // var restaurantsWithinDistance = await Restaurants.find({
  //   location: { $geoWithin: { $geometry: city.geometry } }
  // });
  // console.log("Find within city unsorted: ", restaurantsWithinDistance);

  // in Miles
  var restaurantsWithinCircle = await Restaurants.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], 1 / 3963.2] } }
  });

  // console.log("Find within 1 miles: ", restaurantsWithinCircle);

  //works but max-distance is messed up why 6000???
  var KILOMETERS_PER_MILE = 1000;
  var restaurantsSortedByDistance = await Restaurants.find({
    location: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [long, lat] },
        $maxDistance: 50 * KILOMETERS_PER_MILE
      }
    }
  });

  // console.log("Restaraunts sorted by 3KM: ", restaurantsSortedByDistance);

  results = {};
  results.lat = lat;
  results.long = long;
  // results.city = city;
  results.sorted = restaurantsSortedByDistance;

  return results;
};
