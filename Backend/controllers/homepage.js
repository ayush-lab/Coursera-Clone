const Course = require('../model/courses');
const User  = require('../model/user')

exports.allCourses = (req,res)=>{
    Course.find()
    .then(course=>{
        // console.log(course)
        res.status(200).json({course:course})
    })
    .catch(err=>{
        console.log(err)
    })
}

// this fetches courses based on the category

exports.fetchCourses = (req,res)=>{
    const category = req.params.course;
    // if(category =="all" || category==""){

        Course.find()
        .then(courses=>{
           // console.log(courses);
            res.status(200).json({course:courses})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message:"error occured"})
        })
        
    // }
    // else{
    //     Course.find({category:category})
    //     .then(courses=>{
    //         //console.log(courses);
    //         res.status(200).json({course:courses})
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
}


exports.preferenceCourses = (req,res,next)=>{
    const category = req.params.course;
    if(category=="preferences"){
        const userId = req.body.userId; 
        let courseArray = []
        let no_of_course=0;

        User.findOne({_id:userId})
        .then(user=>{

            // user.preferences = [node, react]

            // console.log(user.preferences);
            user.preferences.forEach(preference=>{

                Course.find({category:preference})
                .then(course=>{
                    no_of_course++;
                    courseArray.push(...course);

                    if(no_of_course === user.preferences.length){
                        res.status(200).json({course:courseArray})
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
}

// taking preferences from user

exports.getPreferences = (req,res,next)=>{
    const preferencesArray = req.body.interest;
    const userId = req.body.userId;
    User.findOne({_id:userId})
    .then(user=>{
        user.preferences=preferencesArray;
        user.save();
    
        return res.status(200).json({message:"Preference added"})
    })
    .catch(err=>{
        console.log(err);
        throw erorr;
    })

}