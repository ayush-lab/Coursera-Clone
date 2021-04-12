const express = require('express');
const authController =require('../controllers/auth');

const {check} = require('express-validator/check');

const Auth = require('../middleware/is-auth');
const router= express.Router();
const User=require('../model/user');

router.post('/signup',[

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value,{req})=>{
        return User.findOne({email:value})
        .then(user=>{
            if(user){
                return Promise.reject('Email already exists!');
            }
        })
    }),

    check('password')
        .trim()
        .isLength({min:5}),
    
    check('name')
        .trim()
        .not()
        .isEmpty() 

],authController.signup);

router.post('/login',[

    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value,{req})=>{
        return User.findOne({email:value})
        .then(user=>{
            if(!user){
                return Promise.reject('No account with this email !');
            }
        })

    })],authController.login);

router.post('/signup/otp',authController.otpVerification);
router.post('/signup/resetOtp',authController.resetPassword);
router.post('/signup/otp-resend',authController.resendOtp)
router.post('/signup/checkOtp',authController.resetOtpVerification);
router.post('/signup/reset-password',authController.newPassword);

module.exports = router;
