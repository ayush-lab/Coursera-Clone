const express = require('express');
const router= express.Router();


const teacherController =require('../controllers/teacher');
const Auth = require('../middleware/is-auth');


router.post('/creator/create-course',teacherController.uploadCourse);

module.exports = router;
