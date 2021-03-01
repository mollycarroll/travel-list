const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    countryName: String, // would I refer to the Place schema here?
    countryCode: String,
    flagImg: String
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;