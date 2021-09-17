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
// var fake_id = "55c04b5b52d0ec940694f818";


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
                                         
    it("Fetch courses detail on stripe page ", async()=>{

        await UserCycle();
       
        await supertest(app).get(`/stripe/${new_course._id}`)
        .set(header)
        .expect(200)
        .then(res=>{
            const course = res.body.course;
            // check it the return type is an object
            expect(typeof course === 'object').toBeTruthy();
            expect(JSON.stringify(course._id)).toEqual(JSON.stringify(new_course._id))
        })
    })
})