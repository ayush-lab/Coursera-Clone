import React, {Component} from 'react';
import TeacherCategory from './TeacherCatergory';
import HomeBanner from '../../HomePage/HomeBanner';
import CourseTitle from '../../HomePage/CourseTitle';
import {Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import TeacherCard from './TeacherCard';
import Layout from '../../../Layout/Layout';
//import ProductApi from './../../../ApiServices/ProductApi';
import AuthServices from "../../../../ApiServices/auth.service";
import '../../HomePage/CSS/Homepage.css';



class TeacherHomePage extends Component {

    state = {
        // CourseLink: this.props.match.params.CourseName,
         Courses: null,
         loading: true,
         redirect:null,
        // img: "",
    }


    componentDidMount(){

        const fd =new FormData();
        const form = {};
        form['userId'] = localStorage.getItem('userId');

        fd.append("userId",localStorage.getItem('userId'))
       

              
                AuthServices.TeacherUpload(form)
                .then(response => {
                    
                    console.log("Teacher Uploaded Courses",response);
                    
                    this.setState({Courses: response.data.data});
                
                    this.setState({loading:false});
                 //   console.log(this.state.Courses);

                

                })
                .catch(error => {
                    console.log(error.response);
                    if(error.response.data.message ==="jwt malformed"){
                        this.setState({redirect:'/login'})
                    }
                })
        

    }

    
    
    DeleteCourse=(event,id)=> {
        const form ={};
        form['courseId']=id;
    

    
      
        AuthServices.TeacherCourseDelete(form)
        .then(response => {
            console.log("Removed Course",response);
 
           
             const updatedCourse =this.state.Courses;
    
             for(let i=0;i<this.state.Courses.length;i++){
                 
                 if(id=== this.state.Courses[i]._id){
                    updatedCourse.splice(i,1);
                 }
             this.setState({Courses:updatedCourse})
  
            
        }})
        .catch(error => {
            console.log(error);
        })
    }    


    render(){

    if(this.state.redirect){
        return <Redirect to={this.state.redirect}/>
    }
    let welcomeMessage=null;

        let data = (<Loader
            type="Puff"
            color="#2D81F7"
            height={50}
            width={50}
            className="loader"

             //3 secs
    
         />);

        if(!this.state.loading){
           
            let CourseArray= this.state.Courses.slice(0);

            data = (
              CourseArray.map(item =>  
              
           

                <TeacherCard  
                key={item._id}
                title={item.title}
                teacher={item.name}
                img={"https://shelp-webapp.herokuapp.com/" + item.imageurl}
                rating={item.rating.ratingFinal}
                Link={`/course/${this.state.CourseLink}/${item._id}`}
                CourseId={item._id}
                DeleteCourse={(event)=>this.DeleteCourse(event,item._id)}
                />)
    
            );
            
            if(CourseArray.length!==0){
                welcomeMessage =  <CourseTitle welcomeMessage ={"Here are your courses, " }/>;
            }
            else{
                welcomeMessage = <CourseTitle welcomeMessage ={"You haven't Uploaded any courses yet "}/>;
            }
           
            };
        
        return(
          <Layout navbar={"teacher"}>
            <div className="container">

                <HomeBanner className="teacherBannner" img={null}/>

                <div className="mt-5 Course-Content"> 
                    <TeacherCategory/>

                    <div className="Course-Content-col">

                        {welcomeMessage}
                               

                                <div className="Course-Content-wrap">
                                    {data}
                                </div>



                    </div>

                </div>



            </div>
        </Layout>
        );
    }

}

export default TeacherHomePage;