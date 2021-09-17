const supertest = require("supertest");
const db = require('../db')
const Course = require('../../model/courses');
const User = require('../../model/user')
const jwt = require("jsonwebtoken");
// const express = require('express');

const app = require('../../app');

var new_User = {};
var new_course={};
var header={};
var access_token=null;
var fake_id = "55c04b5b52d0ec940694f818";

const UserCycle=async ()=>{
    new_User = await User.create({name:'ayush',email:"ayush@gmail.com",password:'password',
    isverified:true,courses:[], bookmark:[] });

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

// jest.setTimeout(30000)

describe("course" , ()=>{
                                         
    it("GET  getting a course by its mongo _id", async()=>{

        await UserCycle()
       
        await supertest(app).get(`/course/${new_course.name}/${new_course._id}/`)
        .set(header)
        .expect(200)
        .then(res=>{
            const course = res.body.course;
            expect(typeof (course) === 'object').toBeTruthy();
            expect(JSON.stringify(course._id)).toBe(JSON.stringify(new_course._id))
            expect(course.title).toBe("course_test");
            expect(course.name).toBe("ayush");
            expect(course.category).toBe("Machine Learning")
            expect(course.discription).toBe("something")
            expect(JSON.stringify(course.creator)).toBe(JSON.stringify(new_User._id))
        })
        
        // if course sent is not in the database
        await supertest(app).get(`/course/${"course_doesn't_exist"}/${fake_id}/`)
        .set(header)
        .expect(200)
        .then(res=>{
            expect(res.body.course).toBeNull()
        })

    })

    it("Bookmark a course", async()=>{

        await UserCycle();

        // when we provide a valid user and a valid course
        await supertest(app).post(`/home/${new_course._id}/${new_course.name}`)
        .set(header)
        .send({"_userID":new_User._id})
        .expect(202)
        .then(res=>{
            expect(res.body).toEqual({message:"successfully bookmarked/unbookmarked"})
        })

        // when we provide an invalid course name and id.
        // supposed to get an error
        await supertest(app).post(`/home/${fake_id}/${"fake_course"}`)
        .set(header)
        .send({"_userID":new_User._id})
        .catch(e=>{
            expect(e).toMatch('error')
        })
    })
    it('Showbookmark of a user', async()=>{

        await UserCycle();

        // manually adding a course in user bookmark list
        new_User.Bookmark.push(new_course._id);
        await new_User.save()

        await supertest(app).get(`/users/${new_User.name}/${new_User._id}`)
        .set(header)
        .expect(200)
        .then(res=>{
            expect(res.body.course.Bookmark.length).toBe(1)
            expect(JSON.stringify(res.body.course._id)).toEqual(JSON.stringify(new_User._id))
            expect(res.body.course.isverified).toBeTruthy()
        })
    })

    it('unbookmark a course', async()=>{

        await UserCycle()

        // adding a bookmark manually 
        new_User.Bookmark.push(new_course._id);
        await new_User.save()

        await supertest(app).post('/unbookmark')
        .send({userId:new_User._id,id:new_course._id})
        .set(header)
        .expect(200)
        .then(res=>{
            expect(res.body).toEqual({message:"successfully unbookmarked"})
        })
    })

    it('Rating', async()=>{

        await UserCycle()

        // dummy rating 4 is sent 
        // by default 1 is selected
        await supertest(app).put('/rating')
        .send({courseId:new_course._id, rating:4})
        .set(header)
        .expect(200)
        .then(res=>{
            expect(res.body.course.rating.timesUpdated).toEqual(2)
            expect(res.body.course.rating.ratingSum).toEqual(5)
            expect(res.body.course.rating.ratingFinal).toEqual(2.5)
            
        })
    })
})