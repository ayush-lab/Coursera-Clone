import React from "react";
import './CSS/CategoriesCard.css';
import Rating from '../CoursePage/Rating';

const CourseCards =(props)=>{
    return(

              <div className="Course-Cards">                
                      <div className="my-card">
                         <img src={props.img} alt="img" loading="lazy"/> 
                          <p className="Course-Title">{props.title}</p>
                          <p className="Course-Teacher">{props.teacher}</p>
                          <p className="Course-info"> 
                            <span className="Course-rating">{props.rating}</span>  
                            <span className="Course-star"> 
                                <Rating 
                                  rating={props.rating}
                                  edit={false}/>
                            </span> 
                            <span className="CourseTimesUpdated">({props.ratingtimesUpdated} ratings)</span>
                            <span className="Course-Price">₹ {props.price}</span>
                          </p>
                      </div>
               </div>
      );

      }

export default CourseCards;


             