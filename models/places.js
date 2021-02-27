const mongoose = require('mongoose');
const places = require('../controllers/places_controller');

const placeSchema = new mongoose.Schema({
    city: String,
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    img: String,
    visited: Boolean,
});

// not sure if this will work
// placeSchema.plugin(require('mongoose-autopopulate'));

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;