const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

// define the User model schema
const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: { unique: false }
    },
    category: String,
    hours: Array,
    location: {
      type: pointSchema,
      required: true
    },
    address: {
      type: { type: Array }
    },
    url: String
  },
  { timestamps: true }
);

RestaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", RestaurantSchema);
