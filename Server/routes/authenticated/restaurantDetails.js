const getRestaurantById = require("../../actions/getRestaurantById");
const getYelpData = require("../../actions/getYelpData");

module.exports = async function restaurantDetails(req, res) {
  const results = await getRestaurantById(req.params.id);
  const yelp = await getYelpData(results.phone);

  console.log(yelp);
  console.log(results);

  res.json({
    message: "Contains restaurant details!",
    user: req.user,
    success: true,
    restaurantId: req.params.id,
    results,
    extra: yelp.data.businesses[0],
  });
};
