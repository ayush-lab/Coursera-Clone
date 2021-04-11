import React, {Component} from 'react';
import './CSS/VideoList.css';

class VideoList extends Component{

 
    
    render(){
        let className=[];
        
        let PlayIcon=[];

        if(this.props.playButton){
            className=['video-list',this.props.playButton];
        }
        
        if(this.props.completed){
            PlayIcon=['fa fa-check-circle',this.props.completed]
        }
        else if(!this.props.completed){
            PlayIcon=['fa fa-pause-circle'];
        }
      

            return(
            <div onClick={this.props.changed}  className={className.join(' ')}>
                
                <div className="play-title">
                
                    <i className={PlayIcon.join(' ')}
                    aria-hidden="true"></i>


                    <span> {this.props.title}</span>   
                
                </div>     

                <div className="video-duration">
                    <span>4.22</span>  
          
                </div> 

            </div> 
            );
        }


}

export default VideoList;

