const mongoose = require("mongoose");

// Define the Point model schema for geospatial queries.
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});

// Define the User model schema.
const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: false },
  },
  geometry: {
    type: pointSchema,
    required: true,
  },
});

CitySchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("City", CitySchema);
