const getRestaurantById = require("../../actions/getRestaurantById");
const api = require("../../actions/getRestaurantById");
const getYelpData = require("../../actions/getYelpData");

module.exports = async function restaurantDetails(req, res) {
  const results = await getRestaurantById(req.params.id);
  const yelp = await getYelpData(results.phone);

  res.json({
    message: "Contains restaurant details!",
    user: req.user,
    success: true,
    restaurantId: req.params.id,
    results,
    extra: yelp.data.businesses[0],
  });
};
