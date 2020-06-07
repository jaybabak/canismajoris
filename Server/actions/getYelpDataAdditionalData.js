const axios = require("axios");

/* Parameters
 *   id = filter by id/email or unique key
 *   field = field on the User schema to update
 *   value = the value to update to
 */

module.exports = async function getYelpAdditionalData(bid) {
  try {
    // Will eventually hold data from both end points.
    var allResultsData = {};

    // Config object for yelp.
    var options = {
      method: "GET",
      url: `https://api.yelp.com/v3/businesses/${bid}`,
      headers: {
        Authorization:
          "Bearer kfds5vXtOV8wgR9Rvo8ScjUB8IDLhScYsWViW3tiiSvdBs81aOr7dhzJ8uBlNzjpaoqrlloUs8ai1c5nKoNu_HswbQnEImHXfdv0HQphuRAnD2P4v_Cqk6LztvnPXnYx",
      },
    };

    // Config object for yelp reviews.
    var optionsReviews = {
      method: "GET",
      url: `https://api.yelp.com/v3/businesses/${bid}/reviews`,
      headers: {
        Authorization:
          "Bearer kfds5vXtOV8wgR9Rvo8ScjUB8IDLhScYsWViW3tiiSvdBs81aOr7dhzJ8uBlNzjpaoqrlloUs8ai1c5nKoNu_HswbQnEImHXfdv0HQphuRAnD2P4v_Cqk6LztvnPXnYx",
      },
    };

    // Functions created to call both end points asyncrounously.
    getAdditionalData = () => axios(options);
    // Gets review information.
    getAdditionalReviewsData = () => axios(optionsReviews);

    // Proceed to make the async call to retrieve business and reviews data.
    const data = await axios.all([
      this.getAdditionalData(),
      this.getAdditionalReviewsData(),
    ]);

    // Merge array from initial yelp response and business lookup.
    allResultsData = {
      ...data[0].data,
      ...data[1].data,
    };

    // Return the array that has been merged in above stop.
    return allResultsData;
  } catch (e) {
    // If error return error
    console.log(e);
    // Return error.
    return e;
  }
};
