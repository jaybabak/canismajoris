#! /usr/bin/env node
var shell = require("shelljs");
const fs = require("fs");
const util = require("util");
const log_file = fs.createWriteStream(
  shell.pwd() + "/data/output/logs/montreal.log",
  { flags: "w" }
);

console.log(
  "\r\n\r\n\r\n******* Massage JSON Data for MongoDB Imports *******\r\n"
);

shell.echo("\r\nReading JSON file");
shell.echo(shell.pwd());
shell.echo("Attempting to open file: ottawa.json");

let rawdata = fs.readFileSync(shell.pwd() + "/data/montreal.json");
let restaurants = JSON.parse(rawdata);

// // print message
// shell.echo("\r\n==============================");
shell.echo("Read file successfully!");
shell.echo("==============================");

// console.log(restaurants);
convertData(restaurants.restaurants);

function convertData(jsonFile) {
  count = 0;
  var data = JSON.stringify(jsonFile);
  data = JSON.parse(data);

  // If location, name property do not exist do NOT include this data.
  var filteredArray = data.filter((restaurant) => {
    if (
      restaurant.hasOwnProperty("address") &&
      restaurant.hasOwnProperty("name") &&
      restaurant.hasOwnProperty("hours") &&
      restaurant.hours[0].hasOwnProperty("time") &&
      restaurant.hours[0].hasOwnProperty("days") &&
      restaurant.hasOwnProperty("category")
    ) {
      // returns true if all above are true
      return true;
    }
    count++;
    shell.echo("\r\n==========REMOVED=============");
    console.log(restaurant.name);
    log_file.write(util.format(count + ". " + restaurant.name) + "\n");
    log_file.write(
      util.format(
        "\r\n======================================================"
      ) + "\n"
    );
    return false;
  });

  console.log(
    "\r\nRestaurants removed (not valid): ",
    data.length - filteredArray.length
  );

  log_file.write(
    util.format(
      "\r\nRestaurants removed (not valid): ",
      data.length - filteredArray.length
    ) + "\n"
  );

  console.log("Total restaurants part of this set: ", data.length + "\n\r");

  log_file.write(
    util.format("Total restaurants part of this set: ", data.length) + "\n"
  );

  var new_array = filteredArray.map(function (item) {
    // console.log(item.name, "longitude", item.longitude);
    // console.log(item.name, "latitude", item.longitude);

    var formattedArray = {};
    formattedArray.name = item.name;
    formattedArray.category = item.category;
    formattedArray.hours = item.hours;
    formattedArray.address = item.address;
    formattedArray.url = item.website;
    formattedArray.phone = item.phone_number;
    formattedArray.location = {
      type: "Point",
      coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
    };

    return formattedArray;
  });

  createJsonFile(new_array, shell.pwd() + "/data/output/montreal.json");
  // console.dir(new_array);
  console.log("\r\nTOTAL ITEMS PROCESSED: ", new_array.length);

  log_file.write(
    util.format("\r\nTOTAL ITEMS PROCESSED: " + new_array.length) + "\n"
  );

  console.log(
    "\r\n\r\n\r\n******* Massage JSON Data for MongoDB Imports *******\r\r\n"
  );
}

function createJsonFile(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

function createLogFile(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

// @todo
/*
 *	1. add log file -> items removed should be added to log file
 * 2. make script so it automaticaly processes the entire directory and outputs to outputs directory
 */
