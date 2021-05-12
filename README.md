# Coursera Clone :blue_heart:
https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

## Fully responsive single page application made using MERN Stack! :white_heart:

### TECH USED
  -   React
  -   Node
  -   Mongo db
  -   Express
  -   Redux


---

## Getting Started

To run a development environment, you can use the `npm start` command. This will start up a development web server on port 3000 for frontend, and a nodemon-watched API server on port 8080. These development servers will automatically reload if changes are made to the source.

  - Install dependencies with:

    ```
    npm i
    ```
  
  - Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   
  - Start the development environment:

    ```
    npm start
    ```

  - add your environmental variables
    - create a  .env file in the root directory and add your tokens there
    - ACCESS_TOKEN_SECRET
    - ACCESS_TOKEN_LIFE
    - REFRESH_TOKEN_SECRET
    - REFRESH_TOKEN_LIFE
    
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
- [x] Homepage with courses being fetched categorically
- [x] Recommended Courses based on user's preferences
- [x] Rating of Courses
- [x] Bookmarked Courses where users can remove or add bookmark
- [x] Download resourses (pdf - notes)
- [x] Responsive React Video player for videos
- [x] Progress bar 
- [x] CoursePage with all the content of the course

#### Teacher
- [x] Proper Authentication system with signup,login,otp verification,resend otp,forgot password (fully validated with bootstrap alerts)
- [x] Fully validated teacher uploading form with descriptition,title,Image and other details
- [x] CkEditor for writing in textbox with abilities to add diffrent headings,paragraphs,bold,italics,link,tables,sizes etc
- [x] Teacher can upload upto 5 videos with upload bar to show progress
- [x] Teacher can see their uploaded courses
- [x] Teacher can delete their course
- [x] Teacher can edit their course

### Screenshots
#### Authentication pages
 
 ```  Signup Page ```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/shelpSignup.png)

 ```  Login Page ```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/loginShelp.png)

 ```  Otp and Resend Otp Page ```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/otp.png)

 
 ```  Forgot Password Page ```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/forgotPassword.png)

 ---
 #### Main Screens

  ```Homepage```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/homepage.png)


```Course Page```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/coursePage.png)


```Preference Page```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/shlepPreference.png)

```Teacher's Courses ```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/teachershelp.png)

```Teacher Uploading Details```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/TeacherUploadCourse.png)


```Teacher Uploading Videos```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/uploadshelp.png)

---
#### Responsive Designs
```Mobile Design Authentication```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/mobileLogin.png)

 
```Mobile Design CoursePage```
![alt text](https://raw.githubusercontent.com/AbhishekSrivas114319/S.H.E.L.P/master/Front-end/src/assets/mobilecourse.png)






