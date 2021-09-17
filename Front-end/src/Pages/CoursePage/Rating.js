import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import AuthServices from "../../ApiServices/auth.service";

class Rating extends Component {
    render(){
       
        let rating = (<p>Rating</p>);

        if(this.props.rating){

            const ratingChanged = (newRating) => {
                const form ={}; 
                form['courseId']=this.props.CourseId;
                form['rating']=newRating;
    
                AuthServices.Rating(form)
                .then(response => {
                    console.log("Rating",response);
                    this.setState({loading:false});
                    alert("Your rating has successfully added")
                })
                .catch(error => {
                    console.log(error);
                })
        
            };

            rating = (
            <ReactStars
                edit={this.props.edit}
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                value={this.props.rating}
                activeColor="#FF9529"/>);
                
            }
        return(
           <>
            {rating}
           </> 
         
        );
    }

}

export default Rating;