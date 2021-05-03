const express = require('express');
const router= express.Router();
const StripeController =require('../controllers/stripe');
const Auth = require('../middleware/is-auth');


router.post('/stripe/payment',Auth,StripeController.stripePayment);
router.get( '/stripe/:courseId',Auth,StripeController.stripeCourse);

module.exports = router;
