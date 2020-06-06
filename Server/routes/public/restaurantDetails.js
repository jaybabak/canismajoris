const config = require("./../../config");
const getRestaurantById = require("../../actions/getRestaurantById");
const getYelpData = require("../../actions/getYelpData");
const getYelpAdditionalData = require("../../actions/getYelpDataAdditionalData");
// Redis config.
const redis = require("redis");
const redis_port = config.redis_port || 6379;
// Configure redis client on port 6379
const redis_client = redis.createClient(redis_port);

module.exports = async function restaurantDetails(req, res) {
  const results = await getRestaurantById(req.params.id);
  console.log(results);

  redis_client.get(req.params.id, async (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    // If no existing cached request exists.
    if (data != null) {
      console.log("Cached Request");
      const cachedData = JSON.parse(data);
      //proceed to send response
      return res.json({
        message: "Contains restaurant details!",
        user: req.user,
        success: true,
        restaurantId: req.params.id,
        results,
        extra: cachedData.businesses[0],
      });
    }

    console.log("Not Cached Request");
    const yelp = await getYelpData(results.phone);
    var serializeData = yelp.data;
    console.log(serializeData);

    if (yelp.data.businesses.length > 0) {
      const yelpAdditionalData = await getYelpAdditionalData(
        yelp.data.businesses[0].id
      );
      console.log(yelpAdditionalData);
      serializeData.businesses[1] = yelpAdditionalData.data;
      console.log(serializeData);
    }

    serializeData = JSON.stringify(serializeData);

    // Add data to Redis cache
    var days = 30; // -> Days to expire cache after
    var expire = days * 24 * 60 * 60 * 1000; // -> Days x hours x minutes x seconds x milliseconds

    // Save to Redis cache.
    redis_client.set(results.id, serializeData, "EX", expire);

    // Proceed to send response
    return res.json({
      message: "Contains restaurant details!",
      user: req.user,
      success: true,
      restaurantId: req.params.id,
      results,
      extra: yelp.data.businesses[0],
    });
  });
};
