const mongoose = require('mongoose');
const fs = require('fs');

let url = `mongodb://localhost/test_mongo_db`;

module.exports = async () => {
    await mongoose
        .connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.mhd4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .catch((err) => console.log(err));
}