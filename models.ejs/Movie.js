const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: [String], // Accepts an array of genres (e.g., ["Action", "Thriller"])
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now, // Optional field
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
