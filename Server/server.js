// Express server imports.
const config = require("./config");
const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimiterRedisMiddleware = require("./middleware/rateLimiterRedis");
// Default security options
app.use(helmet());
// Middleware for adding the body property to req object.
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// Rate limite exceeder -> prevents brute force attacks
app.use(rateLimiterRedisMiddleware);

// Mongoose and database configuration.
const mongoose = require("mongoose");
// Make Mongoose use `findOneAndUpdate()`. warning deprecation notice removal.
mongoose.set("useFindAndModify", false);
// Database models import.
const db = require("./models/index");
// Make connection to Database
db.connect();

// Register user to internal db controller.
const addUser = require("./actions/addUser");
// Authentication/login controller.
const loginUser = require("./actions/loginUser");
// Opt-in for beta-sign up controller.
const optInUser = require("./actions/optInUser");

// Public get restaurant controller.
const getRestaurants = require("./routes/public/getRestaurants");
// Public and private restaurant details controller.
const restaurantDetails = require("./routes/authenticated/restaurantDetails");

// Authenticated routes which require access token.
const apiRouter = require("./routes/api");

// Authenticated routes -> located in routes/authenticated.
app.use("/api", apiRouter);

// Register user path.
app.post("/register-user", addUser);
// Login user path.
app.post("/login", loginUser);
// Optin user for beta release path.
app.post("/optin", optInUser);
// Guest user - Public routes for getting nearby restaurants.
app.get("/restaurants/:long/:lat", getRestaurants);
// Guest user - Public route for getting information about certain restaurant
app.get("/restaurant/:id", restaurantDetails);

// Regular privacy policy HTML pages
app.get("/privacy-policy", function (req, res) {
  res.sendFile(__dirname + "/pages/privacy-policy/index.html");
});
// Regular T&C HTML page.
app.get("/terms-and-conditions", function (req, res) {
  res.sendFile(__dirname + "/pages/terms-and-conditions/index.html");
});
// Static serving asset page/directory.
app.get("/static/jyze/one", function (req, res) {
  res.sendFile(__dirname + "/pages/static/jyze_1.MP4");
});

// Running http version of server
httpServer.listen(process.argv[2] || config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});
