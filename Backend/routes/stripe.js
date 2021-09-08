const express = require('express');
const router= express.Router();
const StripeController =require('../controllers/stripe');
const Auth = require('../Authentication/is-auth');


router.post('/stripe/payment',Auth.authentication,StripeController.stripePayment);
router.get( '/stripe/:courseId',Auth.authentication,StripeController.stripeCourse);

module.exports = router;
