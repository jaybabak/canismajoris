// EXPRESS/SERVER
const fs = require('fs');
const config = require("./config");
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const httpServer = http.createServer(app);
const bodyParser = require("body-parser");
const helmet = require("helmet");
//Default security options
app.use(helmet());
//MIDDLEWARE for adding the body property to req object
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// MONGOOSE/DATABASE CONFIG
const mongoose = require("mongoose");
//Make Mongoose use `findOneAndUpdate()`. warning deprecation notice removal
mongoose.set("useFindAndModify", false);
// MODELS
const db = require("./models/index");
// Make connection to Database
db.connect();

//CONTROLLERS
// Adding user to internal db and mongodb
const addUser = require("./actions/addUser");
// Checks and compares the hashed passwords plus sends accesstoken back
const loginUser = require("./actions/loginUser");
// Checks and compares the hashed passwords plus sends accesstoken back
const optInUser = require("./actions/optInUser");
// Public get restaurant controller
const getRestaurants = require("./routes/public/getRestaurants");
// Public restaurant details
const restaurantDetails = require("./routes/authenticated/restaurantDetails");
// Authenrticated routes which require access token.
const apiRouter = require("./routes/api");

//AUTHENTICATED ROUTES
app.use("/api", apiRouter);

//PUBLIC ROUTES
app.post("/register-user", addUser);
// Login user route
app.post("/login", loginUser);
// Optin user for beta release.
app.post("/optin", optInUser);
// Public routes for getting nearby restaurants.
app.get("/restaurants/:long/:lat", getRestaurants);
// Public route for getting information about certain restaurant
app.get("/restaurant/:id", restaurantDetails);

// Running http version of server
httpServer.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});

// Cert locations
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/jyze.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jyze.net/fullchain.pem')
};

// Https version of server
https.createServer(options, app).listen(8001, () => {
  console.log(`Example app listening on port 8001!`);
});

