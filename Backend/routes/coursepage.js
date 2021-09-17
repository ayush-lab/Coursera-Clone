const express = require('express');
const router= express.Router();

const courseController =require('../controllers/coursepage');
const Auth = require('../Authentication/is-auth');


router.get('/course/:courseName/:courseId',Auth.authentication,courseController.CoursePage);
router.post('/home/:courseId/:courseName',Auth.authentication,courseController.Bookmark);
router.get('/users/:userName/:userId',Auth.authentication,courseController.ShowBookmark);
router.post('/unbookmark',Auth.authentication,courseController.unbookmark);
router.put('/rating',Auth.authentication,courseController.rating);
router.get('/pdf/download/:courseId',courseController.pdf);

module.exports = router;
