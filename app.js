const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPraser = require('body-parser');
const db = require('./models')

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/order');
const createUserRoutes = require('./api/routes/users');

app.use(morgan('dev'));
app.use(bodyPraser.urlencoded({ extended: false }));
app.use(bodyPraser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', createUserRoutes);

app.use((req, res, next) => {
    const error = new Error('Route Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

db();

module.exports = app;