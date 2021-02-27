const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    city: String,
    country: {
        type: mongoose.Schema.ObjectId,
        ref: 'Country',
        required: true
    },
    img: String,
    visited: Boolean,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;