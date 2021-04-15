const express = require('express');
const router= express.Router();

const courseController =require('../controllers/coursepage');
const Auth = require('../middleware/is-auth');


router.get('/course/:courseName/:courseId',Auth,courseController.CoursePage);

module.exports = router;
