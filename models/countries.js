const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    countryName: String,
    countryCode: String,
    flagImg: String
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;