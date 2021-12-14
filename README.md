# Coursera Clone <img src="https://img.shields.io/github/stars/ayush-lab/Coursera-Clone?style=social" alt="star repo" />

<p float="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" width="100" /> 
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" width="100" />
  	
</p>

## Fully responsive single page application made using MERN Stack! :blue_heart:

### TECH USED
  -   React
  -   Node
  -   Mongo db
  -   Express
  -   Redux
  -   Redis
  -   Jest

## DATABASE USED
  - Mongo
  - Redis

---

## Getting Started

Clone the repo to your local environment, you have to seperately install all the dependencies for backend and frontend. 

For Backend, go to the backend folder (cd Backend) and run 
``` npm i ```

  - Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
  
  - add your environmental variables
  - Create a .env file in the root directory of the backend folder and add your tokens there with respect to the config files variables.
 
    - ACCESS_TOKEN_SECRET
    - ACCESS_TOKEN_LIFE
    - REFRESH_TOKEN_SECRET
    - REFRESH_TOKEN_LIFE
    - SENDGRID_KEY
    - MONGO_DATABASE
    - OAuth2Client
    - STRIPE_SECRET_TOKEN
    - REDIS_HOST
    - REDIS_PASSWORD
    - REDIS_PORT

  ### Note: Make sure the .env files variables matches with that of the config files.

For Frontend, go to the frontend folder (cd Front-end) and run
``` npm i ```


To run a development environment, you can use the `npm start` command. This will start up a development web server on port 3000 for frontend, and a nodemon-watched API server on port 8080.

Note: you have to do npm start for backend and frontend seperately.

## Unit testing

You can test the backend, express endpoints using command ( npm test )
    
## Docker Compose

  Coursera Clone is dockerised and docker hub repository can be found here https://hub.docker.com/repository/docker/ayushverma/coursera/general

  If you use Docker and Docker Compose, you can start the entire project with:

  ```
  docker-compose up
  ```
---

## 🏭 Features

#### Student
- [x] **Authentication system** with signup,login,otp verification,resend otp,forgot password (fully validated with bootstrap alerts)
- [x] **Google authentication (Oauth2)** using react-google-login and google auth-library
- [x] **Stripe Payment** gateway integrated with backend to buy courses
- [x] **Redux store** to easily manage states
- [x] Homepage with courses being fetched categorically
- [x] **Recommended Courses** based on user's preferences
- [x] **Rating** of Courses
- [x] **Bookmarked** Courses where users can remove or add bookmark
- [x] Download **resourses** (pdf - notes)
- [x] Responsive React Video player for videos
- [x] Progress bar 
- [x] CoursePage with all the content of the course
- [x] **Searching** based on course and teacher
- [x] **Real Time Live Group classes**

#### Teacher
- [x] Proper Authentication system with signup,login,otp verification,resend otp,forgot password (fully validated with bootstrap alerts)
- [x] Fully validated teacher uploading form with descriptition,title,Image and other details
- [x] CkEditor for writing in textbox with abilities to add diffrent headings,paragraphs,bold,italics,link,tables,sizes etc
- [x] Teacher can upload upto 5 videos with upload bar to show progress
- [x] Teacher can see their uploaded courses
- [x] Teacher can delete their course
- [x] Teacher can edit their course

### Testing using jest and supertest for express endpoints.

## Real Time Live Group Classes using socket.io and Optimized with redis for caching messages

## Screenshots
### Authentication pages
 
#### Signup Page 
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/shelpSignup.png)

 #### Login Page 
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/loginShelp.png)

 #### Otp and Resend Otp Page 
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/otp.png)

 
 ####  Forgot Password Page
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/forgotPassword.png)

 ---
 ### Main Screens

 #### Homepage
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/homepage.png)


#### Course Page
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/coursePage.png)

#### Bookmark Page
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/bookmark.png)

#### Payment Checkout Page
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/checkout.png)

#### Live Classes Page
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/chat.png)

#### Preference Page
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/shlepPreference.png)

#### Teacher's Courses 
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/teachershelp.png)

#### Teacher Uploading Details
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/TeacherUploadCourse.png)


#### Teacher Uploading Videos
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/master/Front-end/src/assets/uploadshelp.png)

---
### Responsive Designs
#### Mobile Design Authentication
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/mobileLogin.png)

 
#### Mobile Design CoursePage
![alt text](https://raw.githubusercontent.com/ayush-lab/Coursera-Clone/main/Front-end/src/assets/mobilecourse.png)






