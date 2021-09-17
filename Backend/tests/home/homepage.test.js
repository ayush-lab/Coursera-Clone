const supertest = require("supertest");
const db = require('../db')
const Course = require('../../model/courses');
const User = require('../../model/user')
const jwt = require("jsonwebtoken");
const app = require('../../app');

var new_User = {};
var new_course={};
var header={};
var access_token=null;
var fake_id = "55c04b5b52d0ec940694f818";


const UserCycle=async ()=>{

    new_User = await User.create({name:'ayush',email:"ayush@gmail.com",password:'password',
    isverified:true,courses:[], bookmark:[],preferences:[] });

    new_course = await Course.create({ title: "course_test", category:"Machine Learning",
    name:"ayush",discription:"something",creator:new_User._id});

    access_token = await jwt.sign({email:"ayush@gmail.com",userId:new_User._id},global.access_token,{
    algorithm: "HS256",
    expiresIn:"10h"
    });                   
    
    header = {'Authorization':'Bearer ' + access_token};
    return ;
    
}

beforeAll(async ()=> await db.connect())
beforeEach(async ()=> {
        await db.clearDatabase()
    });
afterAll(async ()=> await db.closeDatabase());


describe("Homepage" , ()=>{
                                         
    it("GET  Fetch all courses on homepage", async()=>{

        await UserCycle()
       
        await supertest(app).get(`/home/allCourses`)
        .set(header)
        .expect(200)
        .then(res=>{
            const course = res.body.course;
            // check it the return type is an arrray 
            expect(Array.isArray(course)).toBeTruthy();
            // since we have only added one course
            expect(course.length).toBe(1);
            expect(JSON.stringify(course[0]._id)).toEqual(JSON.stringify(new_course._id))
        })
    })
    it("Fetch Courses based on categories", async()=>{

        await UserCycle()
        // add another course
        // let new_course2 = await Course.create({ title: "course_test2", category:"React",
        // name:"vashu",discription:"something2",creator:new_User._id});

        // await new_course2.save();
        // all should fetch all the courses
        await supertest(app).get(`/home/all`)
        .set(header)
        .expect(200)
        .then(res=>{
            const course = res.body.course;
            // check it the return type is an arrray 
            expect(Array.isArray(course)).toBeTruthy();
            // since we have only added 2 courses and doing this we make sure all categories are here
            expect(course.length).toBe(2);
            expect(JSON.stringify(course[0]._id)).toEqual(JSON.stringify(new_course._id));
            expect(JSON.stringify(course[1]._id)).toEqual(JSON.stringify(new_course2._id));

        })

        // fetching courses using a specific category
        // await supertest(app).get(`/home/React`)
        // .set(header)
        // .expect(200)
        // .then(res=>{
        //     const course = res.body.course;
        //     console.log(course)
        //     // check it the return type is an arrray 
        //     expect(Array.isArray(course)).toBeTruthy();
        //     // since we have only added 2 courses and react was the second one.
        //     expect(course.length).toBe(1);
        //     expect(JSON.stringify(course[0]._id)).toEqual(JSON.stringify(new_course2._id));
        //     expect(course[0].category).toMatch('React');
        // })
    })

    
    it("Fetch courses based on user's preferences", async()=>{

        await UserCycle()
        // add another course
        new_User.preferences.push("React")
        await new_User.save()

        let new_course2 = await Course.create({ title: "course_test2", category:"React",
        name:"vashu",discription:"something2",creator:new_User._id});

        await new_course2.save();
        // all should fetch all the courses
        await supertest(app).get(`/home/React`)
        .set(header)
        .expect(200)
        .then(res=>{
            const course = res.body.course;

            // check it the return type is an arrray 
            expect(Array.isArray(course)).toBeTruthy();

            // As we are fetching react courses, we only have one.
            expect(course.length).toBe(1);
            expect(JSON.stringify(course[0]._id)).toEqual(JSON.stringify(new_course2._id));

        })

        // now we will fetch those categories which do not exist.
        await supertest(app).get(`/home/NodeJs`)
        .set(header)
        .expect(200)
        .then(res=>{
            const course = res.body.course;

            // check it the return type is an arrray 
            expect(Array.isArray(course)).toBeTruthy();

            // As Nodejs is not in testing database, hence there is no course.
            expect(course.length).toBe(0);

        })
    })

})