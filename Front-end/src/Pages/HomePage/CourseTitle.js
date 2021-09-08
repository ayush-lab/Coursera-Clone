import React, {Component} from "react";
import './CSS/CategoriesCard.css';
import AuthServices from '../../ApiServices/auth.service';


class CourseTitle extends Component {
    

    render(){

        let userName= AuthServices.getUserName();
        let WelcomeMsg = "Register to Start Learning!";
       
        if(userName!==null){
            WelcomeMsg = (this.props.welcomeMessage+ " " + userName + "!");
        }
        


    return(
      
              <h3 className="CategoriesTitle"> {WelcomeMsg}</h3>

    );

}}

export default CourseTitle;