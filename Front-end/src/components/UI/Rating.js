import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import axios from '../../ApiServices/axiosUrl';

class Rating extends Component {

    render(){

        const ratingChanged = (newRating) => {
            
            console.log(this.props.CourseId)
            const fd =new FormData();
          

            fd.append('_id','5f7629d4c0f20359d3314867');
            fd.append('rating',newRating);

            axios.put("/Rating",fd, {
                headers: {
                    
                    Authorization: 'Bearer '+ localStorage.getItem('user') 
                }
            } )
            .then(response => {
                console.log("Rating",response);
        
                
                this.setState({loading:false});
               
              
    
            })
            .catch(error => {
                console.log(error);
            })
    
          };




        return(
            
            <ReactStars
            style={{display:"inline-block"}}
            count={5}
            initialRating={3}
            onChange={ratingChanged}
           
            size={24}
            isHalf={true}
            value={this.props.value}
            activeColor="#ffd700"/>


        );
    }

}

export default Rating;