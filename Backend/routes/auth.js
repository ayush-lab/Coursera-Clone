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

    check('confirmPassword')
        .trim()
        .custom((value,{req})=>{
            if(value!==password){
                return Promise.return("password and confirm password dont match")
            }

        }),


],authController.signup);

router.post('/login',authController.login);
router.post('/signup/otp',authController.otpVerification);
router.post('/password/reset',authController.resetPassword);
router.post('/password/verify',authController.resetOtpVerification);
router.post('/password',authController.newPassword);

module.exports = router;
