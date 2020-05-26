const validator = require("validator");
const getByLatLong = require("../../actions/getRestaurntsByProximity");

module.exports = async function getRestaurants(req, res) {
  console.log(req);

  const LATITUDE = req.params.lat;
  const LONGITUDE = req.params.long;

  // If no key detected
  // if (
  //   !req.get("key") ||
  //   req.get("key") !=2
  //     "4ffbf1f99f5e17dadc8db354c369ed8756da6c6ecdadafcddf288e1ee218d327"
  // ) {
  //   return res.json({
  //     success: false,
  //     message: "Sorry unauthorised access.",
  //   });
  // }

  if (validator.isFloat(LATITUDE) && validator.isFloat(LONGITUDE)) {
    // Store restaurant results in a variable
    const results = await getByLatLong(LONGITUDE, LATITUDE);

    console.log(results);
    // return response.
    return res.json({
      message: "Contains list of restaurants!",
      success: true,
      results,
    });
  }

  // Error false
  return res.json({
    success: false,
    message: "Sorry incorrect parameters provided lat, long",
  });
};
