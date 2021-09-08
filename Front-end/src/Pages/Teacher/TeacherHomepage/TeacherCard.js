import React,{Component} from "react";
import '../CSS/TeacherHome.css';
import Rating from '../../CoursePage/Rating';
import {Link} from 'react-router-dom';


class TeacherCard extends Component{

    

    render(){

    return(


              <div className="Course-Cards">
                
                      <div className="my-card">
                       <Link className="productLink" to={this.props.Link}> 
                            <img src={this.props.img} alt="img"/>
                        </Link>
                        
                      <div className="TeacherEditSection">
                          <p className="TeacherCourse-Title">{this.props.title}</p>

                <Link to={{
                    pathname:'/TeacherEdit',
                    aboutProps:{CourseId: this.props.CourseId}
                }}>
                    <p className="fa fa-pencil" aria-hidden="true"></p>
                </Link>

                     </div>

                     <div className="TeacherDeleteSection">
                        <p className="Teacher-Course-Teacher">{this.props.teacher}</p>
                        <i onClick={this.props.DeleteCourse} className="fa fa-trash" aria-hidden="true"></i>
                     </div>
                          <p className="Course-info"> 

                            <span className="Course-rating">{this.props.rating}</span>  
                            <span className="Course-star"> <Rating rating={this.props.rating}/></span> 
                            <span className="Course-Price">₹ {this.props.price}</span>
                          </p>

                      </div>


            

               </div>



      );

      }}

export default TeacherCard;


             