import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './CSS/CoursePage.css';
import Url from '../../ApiServices/BackendUrl';


class CourseVideo extends Component {

  state={
    progress:0,
    duration:0,
    videoCompleted:this.props.videoUrl,
  }

  HandleProgress=(state)=>{
  
    let progress =( (state.playedSeconds/this.state.duration)*100);

    if(progress===0){
      this.props.videoDuration(this.state.duration,this.props.index);
    }

    if(progress >=80){
      this.props.videoCompleted(this.props.index);
  
    }
    this.setState({progress:progress})
  
  }

  HandleDuration = (state)=> {

    this.setState({duration:state})
  }

    render () {
      return (
      
        <div className='player-wrapper'> 

        <ReactPlayer 
         className='react-player'
         width='100%'
         height='100%'
         controls={true}
         onProgress={this.HandleProgress}
         onDuration={this.HandleDuration}
         playing={this.props.playing}
         url={Url+ [this.props.videoUrl ? this.props.videoUrl.videoUrl : ""] } />
       

        </div>
       
      )
    }
  }

export default CourseVideo;