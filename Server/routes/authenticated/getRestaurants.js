const getByLatLong = require("../../actions/getRestaurntsByProximity");

module.exports = async function getRestaurants(req, res) {
  const results = await getByLatLong(
    req.user.location.coordinates[0],
    req.user.location.coordinates[1]
  );

  res.json({
    message: "Contains list of restaurants!",
    user: req.user,
    success: true,
    results
  });
};
