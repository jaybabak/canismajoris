// EXPRESS/SERVER
const config = require("./config");
const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const bodyParser = require("body-parser");

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
// Authenrticated routes which require access token.
const apiRouter = require("./routes/api");

//MIDDLEWARE for adding the body property to req object
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//AUTHENTICATED ROUTES
app.use("/api", apiRouter);

//PUBLIC ROUTES
app.post("/register-user", addUser);
// Login user route
app.post("/login", loginUser);
// Optin user for beta release.
app.post("/optin", optInUser);

//running for socket.io instance
httpServer.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});

// INTEGRATING SOCKET.IO
// const io = require("socket.io")(httpServer);
// const matchService = require("./services/match");
// //SOCKETS MATCHING SERVICE
// matchService.match(io);

//RUN ON PORT 3000
// app.listen(config.port, () => {
//     console.log(`Example app listening on port ${config.port}!`);
// });
