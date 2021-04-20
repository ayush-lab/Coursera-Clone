import axios from './axiosUrl';

class AuthServices {


    // --------------------- Authentication routes --------------------------


    register(data) { // done
        return axios.post('/signup',data)
     }

    otp(data){  // done
        return axios.post("/signup/otp",data)
      }


    otpResend(data){ // done
        return axios.post('/signup/otp-resend',data)
    }


    login(data) { // done
        return axios.post('/login',data)
    }

    VerifyEmail(data){ // done
        return axios.post('/signup/resetOtp',data);
    }

    VerifyOtp(data){ // done
        return axios.post('/signup/checkOtp',data);
    }

    ResetPassword(data){  // done
        return axios.post('/signup/reset-password',data);
    }

    logout(){
       localStorage.clear();
    }


    getCurrentUser(){
        return localStorage.getItem('user');
    }

    getUserName(){
       let userName=localStorage.getItem('userName');
       if(userName!=null)
        userName= userName.charAt(0).toUpperCase() + userName.slice(1);
        return userName;
    }


    //   ----------------------- end of auth routes --------------------


    

    HomepageCourse(CourseLink){
        return axios.get(`/home/${CourseLink}`)
    }

    PreferenceCourse(CourseLink,data){
        return axios.post(`/home/${CourseLink}`,data,{
            headers: {
               
             //   Authorization: 'Bearer '+ localStorage.getItem('user') 
            }
        })
    }


    UpdatedCourse(data){
        return axios.put('home/courseUpdate',data);
    }

    
    //Bookmark
    bookmarkCourses(userName,userId){
        return axios.get(`/users/${userName}/${userId}`,{
            headers: {
                
                Authorization: 'Bearer '+ localStorage.getItem('user')
            }
        });
    }

    DeleteBookmark(data){
        return axios.post("/unbookmark",data);
    }


    BookMark(CourseId,CourseName,data){
        return axios.post(`/home/${CourseId}/${CourseName}`,data,{
            headers: {
               
                Authorization: 'Bearer '+ localStorage.getItem('user') 
            }
        })
    
    }


    Download(CourseId){
        return axios.get(`/home/download/${CourseId}`)
    }


    

    FetchCourses(CourseName,CourseId){
        return axios.get(`/course/${CourseName}/${CourseId}`,{
            headers: {
                
                Authorization: 'Bearer '+ localStorage.getItem('user')
            }
        } )
    
    }


   


    Rating(data){
    return axios.put("/Rating",data,{
        headers: {
            
            Authorization: 'Bearer '+ localStorage.getItem('user')
        }
    } )}

   
  

    TeacherUpload(data){
        return axios.post("/teacher/uploads",data,{
            headers: {
               
                Authorization: 'Bearer '+ localStorage.getItem('user') 
            }
        })
    }


    TeacherCourseDelete(data){
        return axios.post("/Course/delete",data,{
            headers: {
               
                Authorization: 'Bearer '+ localStorage.getItem('user') 
            }
        })
    }

    
}

export default new AuthServices();