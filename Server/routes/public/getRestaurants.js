const validator = require("validator");
const getByLatLong = require("../../actions/getRestaurntsByProximity");

module.exports = async function getRestaurants(req, res) {
  const LATITUDE = req.params.lat;
  const LONGITUDE = req.params.long;

  // If valid longitiude & latitude.
  if (validator.isFloat(LATITUDE) && validator.isFloat(LONGITUDE)) {
    // Store restaurant results in a variable
    const results = await getByLatLong(LONGITUDE, LATITUDE);

    // Return response.
    return res.json({
      message: "Contains list of restaurants!",
      success: true,
      results,
    });
  }

  // Error the response with success = false, due to incorrect lat long.
  return res.json({
    success: false,
    message: "Sorry incorrect parameters provided lat, long",
  });
};
