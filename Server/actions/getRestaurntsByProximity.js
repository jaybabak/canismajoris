const mongoose = require("mongoose");
const Restaurants = mongoose.model("Restaurant");

/* Parameters
 *   id = filter by id/email or unique key
 *   field = field on the User schema to update
 *   value = the value to update to
 */

/* @TODO
 *   Add code inside a try/catch block
 *   Return error incase operation not successful
 */

module.exports = async function getByLatLong(long, lat) {
  console.log(lat, long);

  var near = await Restaurants.find({
    location: { $nearSphere: [long, lat], $maxDistance: 6587 / 3963.192 }
  });

  results = {};
  results.lat = lat;
  results.long = long;
  results.query = near;

  var METERS_PER_MILE = 1609.34;

  // console.log(
  //   await Restaurants.find({
  //     location: {
  //       $nearSphere: {
  //         $geometry: { type: "Point", coordinates: [long, lat] },
  //         $maxDistance: 500000
  //       }
  //     }
  //   })
  // );
  // console.log(
  //   await Restaurants.find({
  //     location: {
  //       $nearSphere: {
  //         $geometry: {
  //           type: "Point",
  //           coordinates: [long, lat]
  //         },
  //         $minDistance: 1000,
  //         $maxDistance: 500000
  //       }
  //     }
  //   })
  // );
  console.log(
    await Restaurants.find({
      location: {
        geoNear: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat]
          },
          $maxDistance: 1000000,
          $minDistance: 1
        }
      }
    })
  );

  console.log(
    await Restaurants.find({
      location: { $nearSphere: [long, lat], $maxDistance: 6587 / 3963.192 }
    })
  );
  // console.log(
  //   await Restaurants.find({
  //     location: { $nearSphere: [long, lat], $maxDistance: 1.4 }
  //   })
  // );
  // results.all =
  // const filter = {
  //   email: email
  // };
  // var update = {};

  // if (field === "location") {
  //   update = {
  //     location: {
  //       type: "Point",
  //       coordinates: [value[0], value[1]] //longitude first and latitude second
  //     }
  //   };
  // } else {
  //   update[field] = value;
  // }

  // let updatedUser = await User.findOneAndUpdate(filter, update, {
  //   new: true
  // });

  // if (updatedUser == null) {
  //   console.log("UPDATE_USER_FAILED");
  // } else {
  //   console.log("UPDATE_USER_SUCCESSFUL: ", email, field, value);
  // }

  //returns null if no user found
  return results;
};
