const axios = require("axios");

/* Parameters
 *   id = filter by id/email or unique key
 *   field = field on the User schema to update
 *   value = the value to update to
 */

/* @TODO
 *   Add code inside a try/catch block
 *   Return error incase operation not successful
 */

module.exports = async function getYelpAdditionalData(bid) {
  try {
    // Config object for yelp
    var options = {
      method: "GET",
      url: `https://api.yelp.com/v3/businesses/${bid}`,
      headers: {
        Authorization:
          "Bearer kfds5vXtOV8wgR9Rvo8ScjUB8IDLhScYsWViW3tiiSvdBs81aOr7dhzJ8uBlNzjpaoqrlloUs8ai1c5nKoNu_HswbQnEImHXfdv0HQphuRAnD2P4v_Cqk6LztvnPXnYx",
      },
    };

    // Data returned from yelp
    return await axios(options);
  } catch (e) {
    console.log(e);
    // If error return error
    return e;
  }
};
