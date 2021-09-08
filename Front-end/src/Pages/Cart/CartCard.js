import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './CSS/Cart.css';
import Rating from '../CoursePage/Rating';

class CartCard extends Component{



    state={ alert: {
        valid:false,
        msg:"",
        alertType:" ",
    },


}

    render(){

    return(

    <div className="CartContent">
       

            <div className="CardMain ">


                <Link className="productLink" to={this.props.Link}>
                    <div className="CardImageParent">
                        <img src={this.props.img} alt="course"/>
                    </div>
                </Link>


                    <div className="CardSideContent">

                            <p className="CourseTitle">{this.props.title}</p>

                            <div className="CardParent1">
                                <p className="CourseTeacher">By {this.props.teacher}</p>
                                <p onClick={this.props.remove} className="CourseRemove">Remove</p>
                            </div>
                            <Link className="productLink"  to={this.props.Link}>
                                <div className="CardParent2"> 
                                  
                                        <span className="CourseRating">{this.props.rating}</span>  
                                        <span className="Coursestar">
                                            <Rating 
                                                rating={this.props.rating}
                                                edit={false}/>
                                        </span> 
                                   
                                  
                                        <p className="CourseSave">Go to Course</p>
                                 
                                </div>   </Link>

                                
                                <div className="CardParent3">
                                    <p className="CoursePrice">₹ {this.props.price}</p>
                                    <p className="CourseWhishlist">Move to Whishlist</p>
                                </div>

                                <div className="CourseBuy">
                                    <Link to={`/stripe/${this.props.courseId}`} style={{textDecoration:"none"}}> 
                                        <p>Buy Now</p>
                                    </Link>
                                 </div>


                    </div>
            </div>
    </div>
    );

}}

export default CartCard;