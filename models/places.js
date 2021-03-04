const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    city: String,
    country: {type: String, required: true},
    img: String,
    visited: Boolean,
    notes: String
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;