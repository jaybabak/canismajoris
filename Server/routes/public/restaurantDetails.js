const getRestaurantById = require("../../actions/getRestaurantById");

module.exports = async function restaurantDetails(req, res) {
  console.log(req);

  const results = await getRestaurantById(req.params.id);

  res.json({
    message: "Contains restaurant details!",
    user: req.user,
    success: true,
    restaurantId: req.params.id,
    results,
  });
};
