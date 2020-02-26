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
  var city = await City.findOne({
    geometry: {
      $geoIntersects: {
        $geometry: { type: "Point", coordinates: [long, lat] }
      }
    }
  });

  var restaurantsWithinDistance = await Restaurants.find({
    location: { $geoWithin: { $geometry: city.geometry } }
  });
  console.log("Find within city unsorted: ", restaurantsWithinDistance);

  var restaurantsWithinCircle = await Restaurants.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], 10 / 3963.2] } }
  });

  console.log("Find within 10 miles: ", restaurantsWithinCircle);

  //works but max-distance is messed up why 6000???
  var KILOMETERS_PER_MILE = 1000;
  var restaurantsSorted = await Restaurants.find({
    location: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [long, lat] },
        $maxDistance: 20 * KILOMETERS_PER_MILE
      }
    }
  });

  console.log("Restaraunts sorted by 20KM: ", restaurantsSorted);

  var nearQuery = await Restaurants.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [long, lat] },
        $minDistance: 500,
        $maxDistance: 5000
      }
    }
  });

  console.log("NEAR QUERY min 500m and max 5000m: ", nearQuery);

  var near = await Restaurants.find({
    location: { $nearSphere: [long, lat], $maxDistance: 6587 / 3963.192 }
  });

  results = {};
  results.lat = lat;
  results.long = long;
  results.query = near;
  results.city = city;
  results.circle = restaurantsWithinCircle;
  results.sorted = restaurantsSorted;
  // results.nearQuery = nearQuery;

  // var KILOMETERS_PER_MILE = 1609.34;

  // console.log(
  //   await Restaurants.find({
  //     location: {
  //       geoNear: {
  //         $geometry: {
  //           type: "Point",
  //           coordinates: [long, lat]
  //         },
  //         $maxDistance: 1000000,
  //         $minDistance: 1
  //       }
  //     }
  //   })
  // );

  // console.log(
  //   await Restaurants.find({
  //     location: { $nearSphere: [long, lat], $maxDistance: 6587 / 3963.192 }
  //   })
  // );

  return results;
};
