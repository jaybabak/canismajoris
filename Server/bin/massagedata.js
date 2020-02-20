#! /usr/bin/env node
var shell = require("shelljs");
const fs = require('fs');

console.log("******* Massage JSON Data for MongoDB Imports *******");

shell.echo("Reading JSON file");
shell.echo("Current directory: ");
shell.echo(shell.pwd());

shell.echo("Attempting to open file: ottawa.json");

let rawdata = fs.readFileSync(shell.pwd() + '/data/ottawa.json');
// console.log(rawdata);
let restaurants = JSON.parse(rawdata);

convertData(restaurants);

function convertData(jsonFile){
	var data = JSON.stringify(jsonFile);
	data = JSON.parse(data);
	var filteredArray = data.filter(restaurant => restaurant.hasOwnProperty('address') && restaurant.hasOwnProperty('hours'));
	console.log('Removed invalid items = ', data.length - filteredArray.length);
	var new_array = filteredArray.map(function(item){

		var formattedArray = {};
		formattedArray.name = item.name;
		formattedArray.category = item.category;
		formattedArray.hours = item.hours;
		formattedArray.address = item.address;
		formattedArray.url = item.url;
		formattedArray.location = {
			type: 'Point',
			coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)]
		}
	
		return formattedArray;

	});

	createJsonFile(new_array, shell.pwd() + '/data/output/ottawa.json')
	// console.dir(new_array);
	console.log('TOTAL ITEMS: ', new_array.length);
}


function createJsonFile(data, path){
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

// @todo
/*
*	1. add log file -> items removed should be added to log file
* 2. make script so it automaticaly processes the entire directory and outputs to outputs directory
*/