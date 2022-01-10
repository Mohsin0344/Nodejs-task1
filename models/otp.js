const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    id: String,
    email: String
})

module.exports = mongoose.model('Otp', otpSchema);