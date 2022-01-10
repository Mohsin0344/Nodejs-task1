const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const Otp = require('../../models/otp');
const validator = require('email-validator');
const otpGenerator = require('otp-generator');


router.post('/createUser', (req, res, next) => {
    const emailValidator = validator.validate(req.body.email);
    if(emailValidator){
        const user = User({
            name: req.body.name,
            email: req.body.email,
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        });
        User.findOne({ email: req.body.email }, function (err, doc) {
            if (err) {
                res.status(404).json({
                    message: 'Error',
                    error: err
                });
            } if (doc) {
                res.status(500).json({
                    message: 'User already exists'
                })
            } else {
                generateOtp(user.email);
                user.save()
                    .then(
                        res.status(200).json({
                            message: "user created successfully",
                            user
                        }),
                    )
                    .catch(err => {
                        res.status(404).json({
                            message: err
                        })
                    });
            }
        });
    } else{
        res.status(500).json({
            message: 'Enter correct email'
        })
    }
});


router.get('/getUser/:email', (req, res, next) => {
    const email = req.params.email;
    User.findOne({ email: email })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'User exitsts',
                    user: doc
                })
            } else {
                res.status(404).json({
                    message: "user does not exits"
                })
            }
        })
        .catch()
})

function generateOtp(email){
    const otpCode = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, digits: true , lowerCaseAlphabets: false});
    console.log('Otp code is'+otpCode);
    const otp = Otp({
        id: userId,
        email: email
    });
    otp.save()
    .then( console.log('Otp saved' + otp))
    .catch(err => console.log(err))
}

module.exports = router;