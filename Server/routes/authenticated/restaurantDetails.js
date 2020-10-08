const getCachedAndNonCachedResults = require("./../../actions/getCachedAndNonCachedResults");

module.exports = async function restaurantDetails(req, res) {
  // See if request has been cached already.
  return getCachedAndNonCachedResults(req.params.id, res);
};
