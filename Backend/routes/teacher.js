const express = require('express');
const router= express.Router();
const multer = require('multer');

const teacherController =require('../controllers/teacher');
const Auth = require('../middleware/is-auth');

const ImagefileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'images');
    },
    filename: (req,file,cb)=>{
      cb(null, new Date().toDateString() + '-' + file.originalname)
    }
  })
  
  const ImagefileFilter=(req,file,cb)=>{
    if(file.mimetype ==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
      cb(null,true);
    }
    else {cb(null,false);
          console.log("wrong file type")}
  }
  
  
  
  const VideofileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'videos');
    },
    filename: (req,file,cb)=>{
      cb(null, new Date().toDateString() + '-' + file.originalname)
    }
  })
  
  const VideofileFilter=(req,file,cb)=>{
    if(file.mimetype ==="video/mp4"){
      cb(null,true);
    }
    else {cb(null,false);
          console.log("wrong file type")}
  }
  
  
  const imageMulter=multer({storage:ImagefileStorage,fileFilter:ImagefileFilter}).single('image')
  const videoMulter=multer({storage:VideofileStorage,fileFilter:VideofileFilter}).any()

  


router.post('/creator/create-course',imageMulter,teacherController.uploadCourse);
router.post('/creator/videoUpload/:courseID',videoMulter,Auth,teacherController.uploadVideo);

module.exports = router;
