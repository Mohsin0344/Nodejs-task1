const express = require('express');
const router = express.Router();
const Product = require("../../models/product");
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find().exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                products: {
                    doc
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "message": err
            })
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    "message": "Product does not exists"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const product = Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        res.status(200).json({
            message: 'Post Products route',
            createdProduct: product
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err
        });
    });
});

module.exports = router;