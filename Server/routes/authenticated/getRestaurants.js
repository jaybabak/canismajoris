const getByLatLong = require("../../actions/getRestaurntsByProximity");

module.exports = async function getRestaurants(req, res) {
  // Gets full list of restaurants based on users location from DB.
  const results = await getByLatLong(
    req.user.location.coordinates[0],
    req.user.location.coordinates[1]
  );

  // Return the list of restaurants.
  res.json({
    message: "Contains list of restaurants!",
    user: req.user,
    success: true,
    results,
  });
};
