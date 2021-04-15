const express = require('express');
const router= express.Router();


const homeController =require('../controllers/homepage');
const Auth = require('../middleware/is-auth');


router.get('/home/:course',homeController.fetchCourses);
router.post('/home/interests',homeController.getPreferences);
router.post('/home/:course',homeController.fetchCourses);


module.exports = router;
