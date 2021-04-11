import React from "react";
import './CSS/CategoriesCard.css';
import Rating from '../CoursePage/Rating';
//import Python from '../../../assets/Images/python.png';
//import ML from '../../../assets/Images/ml.png';

const CourseCards =(props)=>{



    return(
      

              <div className="Course-Cards">
                
                      <div className="my-card">
                         <img src={props.img} alt="img"/> 
                         {/* <img src={Webdev} alt="course"/>  */}
                          <p className="Course-Title">{props.title}</p>
                          <p className="Course-Teacher">{props.teacher}</p>

                          <p className="Course-info"> 

                            <span className="Course-rating">{props.rating}</span>  
                            <span className="Course-star"> <Rating rating={props.rating}/></span> 
                            <span className="CourseTimesUpdated">({props.ratingtimesUpdated} ratings)</span>
                            <span className="Course-Price">₹ 500</span>
                          </p>

                      </div>


            

               </div>



      );

      }

export default CourseCards;


             