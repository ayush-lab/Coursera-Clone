const express = require('express');
const router= express.Router();


const homeController =require('../controllers/homepage');
const Auth = require('../Authentication/is-auth');

router.get('/home/allCourses',homeController.allCourses);
router.get('/home/:course',homeController.fetchCourses);
router.post('/home/:course',Auth.authentication,homeController.preferenceCourses);
router.post('/home/interests',Auth.authentication,homeController.getPreferences);



module.exports = router;
