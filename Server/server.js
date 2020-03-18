const config = require("./config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer);
const matchService = require("./services/match");

//MONGOOSE CONFIG
//Make Mongoose use `findOneAndUpdate()`. warning deprecation notice removal
mongoose.set("useFindAndModify", false);

//MIDDLEWARE for adding the body property to req object
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//DATABASE
const db = require("./models/index");
db.connect(); //make connection to Database

//CONTROLLERS
const addUser = require("./actions/addUser"); //adding user to internal db and mongodb
const loginUser = require("./actions/loginUser"); //checks and compares the hashed passwords plus sends accesstoken back
const apiRouter = require("./routes/api"); //authenticated routes must require a token

//PUBLIC ROUTES
app.post("/register-user", addUser);
app.post("/login", loginUser);

//AUTHENTICATED ROUTES
app.use("/api", apiRouter);

//SOCKETS MATCHING SERVICE
matchService.match(io);

//RUN ON PORT 3000
// app.listen(config.port, () => {
//     console.log(`Example app listening on port ${config.port}!`);
// });

//running for socket.io instance
httpServer.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});
