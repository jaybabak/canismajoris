const mongoose = require("mongoose");
const Restaurants = mongoose.model("Restaurant");
const City = mongoose.model("City");

/* Parameters
 *   long = users longitude
 *   lat = users latitude
 */

module.exports = async function getByLatLong(long, lat) {
  console.log(lat, long);

  // Restaurant list by geonear
  var restaurantsSortedByDistanceGeoNear = await searchRestaurantsNearBy(
    long, //Users longitude
    lat, // Users latitude
    150000 //Max distance in meters
  );

  results = {};
  results.lat = lat;
  results.long = long;
  results.restaurants = restaurantsSortedByDistanceGeoNear;

  //Return results
  return results;
};

async function searchRestaurantsNearBy(longitude, latitude, distance) {
  try {
    const results = await Restaurants.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "dist.calculated",
          maxDistance: distance,
          includeLocs: "dist.location",
          spherical: true
        }
      }
    ]);

    return results;
  } catch (e) {
    // Catch errors
    return e;
  }
}

// ------------------------------------------------------------------------

/*
 * PERFORMANCE FIX
 * STEPS TO IMPLEMENT
 * - Create a polygon/geojson object around user's latitude longitude
 * - Save the polygon/geojson object
 * - Query that using geoIntersects
 * - Or Using $geoWithin
 * - Need to test which one is more performance > check mongo docs
 * - Results are unsorted!!! IMPORTANT
 */

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
// var restaurantsWithinCircle = await Restaurants.find({
// location: { $geoWithin: { $centerSphere: [[long, lat], 1 / 3963.2] } }
// });
// console.log("Find within 1 miles: ", restaurantsWithinCircle);

// ------------------------------------------------------------------------

/*
 * Simple query that provides restaurants sorted but without DISTANCE FIELD
 * STEPS TO IMPLEMENT
 * - Create a polygon/geojson object around user's latitude longitude
 * - Save the polygon/geojson object
 * - Query that using geoIntersects
 * - Or Using $geoWithin
 * - Need to test which one is more performance > check mongo docs
 * - Results are unsorted!!! IMPORTANT
 */

// var KILOMETERS_PER_MILE = 1000;
// var restaurantsSortedByDistance = await Restaurants.find({
//   location: {
//     $nearSphere: {
//       $geometry: { type: "Point", coordinates: [long, lat] },
//       $maxDistance: 75 * KILOMETERS_PER_MILE
//     }
//   }
// });

// ------------------------------------------------------------------------
/*
 * Exteneded search if code statement to check if no restaurants found
 * - Idea: to inplement a button maybe in the future to allow user to manually do an extended search
 */

// If no restaurants found code block increase search radius (double to 150KM)
// if (restaurantsSortedByDistanceGeoNear.length < 50) {
//   console.log("Couldnt find restaurants, increasing search radius to 120KM.");
//   restaurantsSortedByDistanceGeoNear = await searchRestaurantsNearBy(
//     long,
//     lat,
//     150000
//   );
// }
