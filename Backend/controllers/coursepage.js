const Course = require('../model/courses');

exports.CoursePage = (req,res,next)=>{
    const courseName=req.params.courseName;
    const courseId=req.params.courseId;

    Course.findOne({_id:courseId})
    .then(course=>{
        console.log(course);
        res.status(200).json({course:course})
    })
    .catch(err=>{
        console.log(err)
    })

}

