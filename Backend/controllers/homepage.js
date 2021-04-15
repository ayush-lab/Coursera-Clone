const Course = require('../model/courses');
const User  = require('../model/user')


exports.fetchCourses = (req,res,next)=>{
 
    const category = req.params.course;
   // console.log(category)

    if(category =="all" || category==""){
        Course.find()
        .then(courses=>{
            console.log(courses);
            res.status(200).json({course:courses})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    if(category=="preferences"){
        const userId = req.body.userId; 
        let courseArray = []
        let no_of_course=0;

        User.findOne({_id:userId})
        .then(user=>{
            // user.preferences = [node, react]
            console.log(user.preferences);
            user.preferences.forEach(preference=>{

                Course.find({category:preference})
                .then(course=>{
                    no_of_course++;
                    courseArray.push(...course);

                    if(no_of_course === user.preferences.length){
                        console.log(courseArray);
                        res.status(200).json({coursesarray:courseArray})
                    }

                })
                .catch(err=>{
                    console.log(err);
                })  
            })

        })
       
        .catch(err=>{
            console.log(err)
        })
       

    }

    
    else{
        Course.find({category:category})
        .then(courses=>{
            console.log(courses);
            res.status(200).json({course:courses})
        })
        .catch(err=>{
            console.log(err)
        })
    }

}

exports.getPreferences = (req,res,next)=>{
    const preferencesArray = req.body.interest;
    const userId = req.body.userId;
   
    User.findOne({_id:userId})
    .then(user=>{
        user.preferences=preferencesArray;
        user.save();
        console.log(user);
        res.status(200).json({message:"Preference added"})
    })
    .catch(err=>{
        console.log(err);
    })

}