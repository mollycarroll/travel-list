const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    city: String,
    country: String,
    img: String, // could I use an API to populate this?
    visited: Boolean,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;