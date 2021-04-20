const Course = require('../model/courses');

exports.uploadCourse =(req,res,next)=>{

   // console.log(req.file)

    const title=req.body.title;
    const category=req.body.category;
    const imageurl=req.file.path;
    const name=req.body.name;
    const willLearn=req.body.willLearn;
    const discription=req.body.discription;
    const discriptionLong=req.body.discriptionLong;
    const requirement=req.body.requirement;
    const userId=req.body._id;
    console.log(userId,title)

    const course = new Course({
        title:title,
        category:category,
        imageurl:imageurl,
        name:name,
        willLearn:willLearn,
        discription:discription,
        discriptionLong:discriptionLong,
        requirement:requirement,
        rating:0,
        creator:userId,
    });

    course.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({message:"Course created successfully",newCourse:result})
    })
    .catch(err =>{
        console.log(err);
    })

}

exports.uploadVideo = (req,res,next)=>{
    const courseId = req.params.courseID;
    console.log(req.files);
    const videos  = req.files;
   

    let videoContent = []
   
    Course.findOne({_id:courseId})
    .then(course=>{

        videos.forEach(video=>{
            let videoContentContainer = {
                videoUrl:null,
                usersWatched:[],
            }
            videoContentContainer.videoUrl = video.path;
            videoContent.push(videoContentContainer);
        })  
        console.log(videoContent);
        course.videoContent=videoContent;
        course.save()
        .then(result=>{
            res.status(200).json({message:"successfully saved the video"})
        })
    })
    .catch(err=>{
        console.log(err);
    })



} 