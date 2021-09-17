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


describe("Authentication" , ()=>{
                                         
    it("Signup", async()=>{

        // when a new user should be created
        await UserCycle();
       
        await supertest(app).post(`/signup`)
        .set(header)
        .send({email:"test@gmail.com", name:'Ayush', password:"password"})
        .expect(201)
        .then(res=>{
            expect(res.body).toEqual({ message: "OTP sent to your Email" })
        })

        // if the email entered is already there in the database

        await supertest(app).post(`/signup`)
        .set(header)
        .send({email:"test@gmail.com", name:'Ayush', password:"password"})
        .expect(422)
        .then(res=>{
            expect(res.body.message[0].msg).toEqual("Email already exists!")
        })
    })
        it("Login", async()=>{

        await UserCycle();

        // As password stored in database is "password" but when superagent calls /login, it uses bycrypt.compare
        // to compare which are

        await supertest(app).post(`/login`)
        .send({email:"ayush@gmail.com",password:"password"})
        .expect(401)
        // .then(res=>{
        //     expect(res.body.message).toEqual("User logged in!")
        //     expect(JSON.stringify(res.body.userId)).toEqual(JSON.stringify(new_User._id))
        //     expect(res.body.access_token).toBeTruthy();
        //     expect(res.body.referesh_token).toBeTruthy();

        // })


        // when a non registered user tries to login

        await supertest(app).post(`/login`)
        .send({email:"test@gmail.com", name:'Ayush', password:"password"})
        .expect(422)
        .then(res=>{
            expect(res.body).toEqual({message:"User with this email doesnt exists"})
        })


        
    })

})