const mongoose = require("mongoose");
const Restaurants = mongoose.model("Restaurant");

/* Parameters
 *   long = users longitude
 *   lat = users latitude
 */

module.exports = async function getByLatLong(long, lat) {
  lat = parseFloat(lat);
  long = parseFloat(long);

  // Restaurant list by geonear.
  var restaurantsSortedByDistanceGeoNear = await searchRestaurantsNearBy(
    long, //Users longitude
    lat, // Users latitude
    65000 //Max distance in meters
  );

  results = {};
  results.lat = lat;
  results.long = long;
  results.restaurants = restaurantsSortedByDistanceGeoNear;

  // Return results.
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
          spherical: true,
        },
      },
    ]);

    return results;
  } catch (e) {
    // If error console error.
    console.log(e);
    // Catch errors
    return e;
  }
}
