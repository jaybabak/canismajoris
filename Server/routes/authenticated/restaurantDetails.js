const config = require("./../../config");
const getRestaurantById = require("../../actions/getRestaurantById");
const getYelpData = require("../../actions/getYelpData");
const getYelpAdditionalData = require("../../actions/getYelpDataAdditionalData");
// Redis config.
const redis = require("redis");
const redis_port = config.redis_port || 6379;
// Configure redis client on port 6379.
const redis_client = redis.createClient(redis_port);

module.exports = async function restaurantDetails(req, res) {
  // See if request has been cached already.
  redis_client.get(req.params.id, async (err, data) => {
    // Response object that is sent back to client.
    var combinedRestaurantDataFromYelp = {};
    // Contains reastaurant information to send back.
    var results = {};

    // If error then send response with error.
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    // Send CACHED response.
    if (data != null) {
      // Add additional data to the existing results object for restaurants.
      results = JSON.parse(data);

      // Proceed to send CACHED response.
      return res.json({
        message: "Contains restaurant details!",
        user: req.user,
        success: true,
        restaurantId: req.params.id,
        results,
      });
    }

    // Cache the mongodb results in Redis as well.
    results = await getRestaurantById(req.params.id);

    // If Not CACHED proceed to make request and get additional data, then
    if (results.toObject().hasOwnProperty("phone")) {
      const yelp = await getYelpData(results.phone);

      // if initial response does not have any response data.
      if (yelp.data.businesses.length > 0) {
        // Network request to get photos and other data about restaurant.
        var yelpAdditionalData = await getYelpAdditionalData(
          yelp.data.businesses[0].id
        );

        // Merge array from initial yelp response and business lookup.
        combinedRestaurantDataFromYelp = {
          ...yelp.data.businesses[0],
          ...yelpAdditionalData,
        };
      } else {
        // Merge array properties.
        combinedRestaurantDataFromYelp = {
          ...yelp.data.businesses[0],
        };
      }

      // Append the combine yelp data into the "extra" property and cache it all.
      results.extra = combinedRestaurantDataFromYelp;

      // Set # of days to expire cache after.
      var days = 120;
      // Save to Redis cache.
      redis_client.set(
        results.id,
        JSON.stringify(results),
        "EX",
        days * 24 * 60 * 60 * 1000
      );
    }

    // Proceed to send NON-CACHED response.
    return res.json({
      message: "Contains restaurant details!",
      user: req.user,
      success: true,
      restaurantId: req.params.id,
      results,
    });
  });
};
