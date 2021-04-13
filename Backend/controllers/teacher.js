const Course = require('../model/courses');

exports.uploadCourse =(req,res,next)=>{

    console.log(req.body)
    const title=req.body.title;
    const category=req.body.category;
    const imageUrl=req.file.filename;
    const name=req.body.name;
    const willLearn=req.body.willLearn;
    const discription=req.body.discription;
    const discriptionLong=req.body.discriptionLong;
    const requirement=req.body.requirement;
    const userId=req.body._id;


    console.log(title);

    const course = new Course({
        title:title,
        category:category,
        imageUrl:imageUrl,
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