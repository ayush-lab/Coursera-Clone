import React from "react";
import '../../HomePage/CSS/CategoriesCard.css';
import {NavLink} from 'react-router-dom'

const TeacherCategory =(props)=>{


    return(

        <div className="CategoryDevider">


                <div className="Categories-main">
                
                <h3 className="Categories-heading"> Dashboard</h3>


            <div className="ListOfCourses">
                  <NavLink to='/teacherhome'  >Upload Your Courses</NavLink>
                  <NavLink to='/teacherhome'>Edit your Course</NavLink>
                  
            </div>
                </div>

                <div className="Course-Devider">

                </div>

        </div>


     


    );

}

export default TeacherCategory;