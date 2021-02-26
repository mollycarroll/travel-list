const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    city: String,
    country: String,
    img: String,
    visited: Boolean,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;