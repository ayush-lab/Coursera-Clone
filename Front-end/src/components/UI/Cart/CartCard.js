import React,{Component} from 'react';
//import Webdev from '../../../assets/Images/webdev.png';
import {Link} from 'react-router-dom';
import './CSS/Cart.css';
import Rating from '../CoursePage/Rating';
import axios from '../../../ApiServices/axiosUrl'
//import Alert from '../../../Auth/Forms/alert'

class CartCard extends Component{



    state={ alert: {
        valid:false,
        msg:"",
        alertType:" ",
    },

    // alertPressed:false,

}

// AlertError(alertmsg, alertType) {
//     const AlertArray = {...this.state.alert};
//     AlertArray.msg = alertmsg;
//     AlertArray.valid=true;
//     AlertArray.alertType=alertType;
//     this.setState({alert:AlertArray});

// }
     


    render(){

        // let alertContent = null;
        
      
        // if(this.state.alert.valid){
        //     alertContent = ( <Alert value={this.state.alertPressed} 
        //         alertMsg ={this.state.alert.msg} 
        //         alertType={this.state.alert.alertType} /> )
        // }
        
        
    
   
    return(

    <div className="CartContent">
       

            <div className="CardMain ">


                <Link className="productLink" to={this.props.Link}>
                    <div className="CardImageParent">
                        <img src={this.props.img} alt="course"/>
                    </div>
                </Link>


                    <div className="CardSideContent">

                            <p class="CourseTitle">{this.props.title}</p>

                            <div className="CardParent1">
                                <p className="CourseTeacher">By {this.props.teacher}</p>
                                <p onClick={this.props.remove} className="CourseRemove">Remove</p>
                            </div>
                            <Link className="productLink"  to={this.props.Link}>
                                <div className="CardParent2"> 
                                  
                                        <span className="CourseRating">{this.props.rating}</span>  
                                        <span className="Coursestar"><Rating rating={this.props.rating}/></span> 
                                   
                                  
                                        <p className="CourseSave">Go to Course</p>
                                 
                                </div>   </Link>

                                
                                <div className="CardParent3">
                                    <p className="CoursePrice">₹ 500</p>
                                    <p className="CourseWhishlist">Move to Whishlist</p>
                                </div>

                                <div className="CourseBuy"> <p>Buy Now</p></div>
                                

                    </div>



            </div>




    </div>






    );

}}

export default CartCard;
