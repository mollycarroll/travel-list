const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    city: String,
    country: String,
    img: String, // could I set a string as a default value here?
    visited: Boolean,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;