const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const getRestaurants = require("./authenticated/getRestaurants");
const restaurantDetails = require("./authenticated/restaurantDetails");
const home = require("./authenticated/home");
const updateUserWithEmail = require("./authenticated/updateUserWithEmail");

// middleware that is specific to this router
router.use(authMiddleware);

/* Authenticated Routes
 *  - all routes for users that have already been authenticated (token)
 */
router.get("/get-restaurants", getRestaurants);

router.get("/restaurant/:id", restaurantDetails);

router.get("/home", home);

router.post("/update", updateUserWithEmail);

module.exports = router;
