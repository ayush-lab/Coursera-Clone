import React, {Component} from "react";
import './CSS/CategoriesCard.css';
import AuthServices from '../../../ApiServices/auth.service';


class CourseTitle extends Component {
    
    state ={
        userName:"",
    }

    componentDidMount(){
        
        let userName= AuthServices.getUserName();
        if(userName!==null){
            this.setState({userName:userName});
        }
    }

    

    

    render(){

        let WelcomeMsg = "Register to Start Learning!";
       
       
         
        


        if(this.state.userName!==""){
           
            WelcomeMsg = (this.props.welcomeMessage+ " " + this.state.userName + "!");
        }

    return(
      
              <h3 className="CategoriesTitle"> {WelcomeMsg}</h3>

    );

}}

export default CourseTitle;