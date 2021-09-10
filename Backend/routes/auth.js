const express = require('express');
const authController =require('../controllers/auth');
const googleController=require('../controllers/googleAuth');
const {check} = require('express-validator');
const Auth = require('../Authentication/is-auth');
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

// google authentication route

router.post("/google_login",googleController.googleLogin);
router.post("/google_signup",googleController.googleSignUp);

// Fetching access Token using refresh token
router.post("/auth/token/",Auth.GetnewAccessToken);


module.exports = router;
