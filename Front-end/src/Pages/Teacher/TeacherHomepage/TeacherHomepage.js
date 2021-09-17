import React, {Component} from 'react';
import TeacherCategory from './TeacherCatergory';
import HomeBanner from '../../HomePage/HomeBanner';
import CourseTitle from '../../HomePage/CourseTitle';
import {Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import TeacherCard from './TeacherCard';
import Layout from '../../../components/Layout/Layout';
import AuthServices from "../../../ApiServices/auth.service";
import Url from '../../../ApiServices/BackendUrl';
import '../../HomePage/CSS/Homepage.css';
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actions";


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
              
                AuthServices.TeacherHomePage(form)
                .then(response => {
                    console.log("Teacher Uploaded Courses",response);
                    this.setState({Courses: response.data.data});
                    this.setState({loading:false});
                })
                .catch(error => {
                    console.log(error);
                })
    }
    

    DeleteCourse=(id)=> {
        const form ={};
        form['courseId']=id;
        let answer =  window.confirm("Are you sure to delete this course?")
        if(answer){
            AuthServices.TeacherCourseDelete(form)
            .then(response => {
                console.log("Removed Course",response);
                this.props.RemoveCourseFromStore(id);
               
                 const updatedCourse =[...this.state.Courses];
        
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
              CourseArray.map((item,index) =>  

                <TeacherCard  
                    key={index}
                    title={item.title}
                    teacher={item.name}
                    img={Url + item.imageurl}
                    rating={parseInt(item.rating.ratingFinal)}
                    Link={`/course/${this.state.CourseLink}/${item._id}`}
                    CourseId={item._id}
                    price={item.price}
                    DeleteCourse={()=>this.DeleteCourse(item._id)}
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

const mapDispatchToProps = (dispatch) => {
    return {
        RemoveCourseFromStore:(data)=>dispatch(actionCreators.RemoveCourseFromStore(data)),
        //  fetchPreferenceCourses:(CourseLink,form)=>dispatch(actionCreators.fetchAsyncPreferenceCourse(CourseLink,form))
    };
  };

export default connect(null, mapDispatchToProps)(TeacherHomePage);
