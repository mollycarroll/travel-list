const mongoose = require('mongoose');
const places = require('../controllers/places_controller');

const placeSchema = new mongoose.Schema({
    city: String,
    country: String,
    img: String,
    visited: Boolean,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;