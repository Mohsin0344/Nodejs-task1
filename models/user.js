const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _userId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    createdAt: Number,
    updatedAt: Number
});

module.exports = mongoose.model('User', userSchema);