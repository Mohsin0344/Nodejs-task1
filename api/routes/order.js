 const express = require('express');
 const router  = express.Router();

 router.get('/', (req, res, next) =>{
     res.status(200).json({
         message: "You are getting order details"
     });
 });


 router.post('/', (req, res, next) =>{
     const order = {
         productId: req.body.productId,
         quantity: req.body.quantity
     }
    res.status(200).json({
        message: "You are placing an order",
        order: order
    });
});

router.get('/:orderId', (req, res, next) =>{
    const orderId = req.params.orderId;

    res.status(200).json({
        message: "You are getting a specific order",
        orderId
    });
});

 module.exports = router;