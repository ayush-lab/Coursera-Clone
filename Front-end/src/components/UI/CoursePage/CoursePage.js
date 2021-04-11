import React, {Component} from 'react';
import './CSS/CoursePage.css'
import {NavLink,Redirect} from 'react-router-dom';
import CourseDesc from './CourseDesc';
import CourseVideo from './CourseVideo';
import axios from '../../../ApiServices/axiosUrl';
import VideoList from './VideoList';
import Layout from '../../Layout/Layout';
import parse from 'html-react-parser';
import ProgressBar from 'react-bootstrap/ProgressBar';
import AuthServices from '../../../ApiServices/auth.service';


class CoursePage extends Component {

    state = {
        CourseId: this.props.match.params.Courseid,
        CourseName:this.props.match.params.Course,
        CoursesInfo: null,
        loading: true,
        token:localStorage.getItem('user'),
        redirect:null,
        CurrentVideo:'',
        playing:false,
        PlayButton:'fa fa-play-circle',
        progress:0,
        index:0,
        WatchedVideoCount:0,

        'video0':true,
         'video1':false,
         'video2':false,
         'video3':false,
         'video4':false,
         
         'video0Completed':false,
         'video1Completed':false,
         'video2Completed':false,
         'video3Completed':false,
         'video4Completed':false,
         'video0Duration':'0',
         'video1Duration':'0',
         'video2Duration':'0',
         'video3Duration':'0',
         'video4Duration':'0',






     }

    componentDidMount(){
      
      
        AuthServices.FetchCourses(this.state.CourseName,this.state.CourseId)
        .then(response => {
            console.log("CoursePage Response",response);
       
            this.setState({CoursesInfo: response.data.course});

            this.setState({CurrentVideo:response.data.course.videoContent[0]})
            this.setState({loading:false});
            let count=0;

        for(let j in response.data.course.videoContent){ 
            for (let i in response.data.course.videoContent[j].usersWatched){
                if(localStorage.getItem('userId')===response.data.course.videoContent[j].usersWatched[i]){
                    this.setState({['video'+j+'Completed']:true});
                    count+=1;
                    
                    break;
                }
            }
        }
        this.setState({WatchedVideoCount:count})
       
      let progress = (this.state.WatchedVideoCount/this.state.CoursesInfo.videoContent.length)*100;
      this.setState({progress:progress})

          

        })
        .catch(error => {
            console.log(error.response);
            if(error.response.data.message ==='jwt malformed')
            if(error.response.status ===500)
            this.setState({redirect:"/login"})
        })
       
    }


    
    VideochangeHandler=(event,video,index,playing)=> {
       let VideoNumber = 'video' + index;
       this.setState({CurrentVideo:video})
       this.setState({index:index})
     
      // this.setState({[VideoNumber]:!this.state[VideoNumber]})

      for(let i=0;i<5;i++){
        if(i===index){
            this.setState({[VideoNumber]:true})
        }
        else{
            this.setState({['video'+i]:false})
        }
      }
     

       
        if(playing){
            this.setState({playing:true})
        }
        else{
            this.setState({playing:false})
        }
   
    }


    videoCompleted=(index)=> {
     
       if(!this.state['video'+index+'Completed']) {
       this.setState(prevState => 
        ({WatchedVideoCount:prevState.WatchedVideoCount+1}));


        const form = {}; 
        form['courseID']= this.state.CourseId;
        form['userID']=localStorage.getItem('userId');
        form['videoID']=this.state.CoursesInfo.videoContent[index].videoUrl;
    
           axios.post('/watchedByuser',form)
           
           .then(response => {
            console.log("Video information sent Response",response);
       
          
    
        })
    
        .catch(error => {
            console.log(error.response);
            if(error.response.data.message ==='jwt malformed')
            if(error.response.status ===500)
            this.setState({redirect:"/login"})
        })
       }

   
       
       let progress = (this.state.WatchedVideoCount/this.state.CoursesInfo.videoContent.length)*100;
       this.setState({progress:progress})
 
      this.setState({['video'+index+'Completed']:true});
      
      

    }

    videoDuration =(duration,index)=>{
        this.setState({['video'+index+'Duration']:duration})
        
    }  

    render(){
        if(this.state.redirect)
        return <Redirect to={this.state.redirect}/>;


        let title = null;
        let short_description=null;
        let teacher=null;
        let createdAt=null;
        let VideoUrl=null;
        let rating=null;
        let ratingtimesUpdated=null;
        let requirement=null;
        let longDescription=null;
        let willLearn=null;
        let videourl=null;
        let CurrentVideo="";
        let playButton='';
        let playingVideo=false;
        let completed=false;
        let progressbar=null;

        if(this.state.loading ===false){
                

                title = (this.state.CoursesInfo.title);
                short_description = (this.state.CoursesInfo.discription);
                teacher=(this.state.CoursesInfo.name)
                createdAt=(this.state.CoursesInfo.createdAt);
                createdAt =createdAt.split("T")[0];
                //videoUrl=(this.state.CoursesInfo.videourl);
                rating=(this.state.CoursesInfo.rating.ratingFinal);
                requirement=parse(this.state.CoursesInfo.requirement);
                longDescription=parse(this.state.CoursesInfo.discriptionLong);
                willLearn=parse(this.state.CoursesInfo.willLearn);
                ratingtimesUpdated=(this.state.CoursesInfo.rating.timesUpdated);
                 videourl=(this.state.CoursesInfo.videoContent.slice(0));
   
                CurrentVideo =this.state.CurrentVideo;
                

               
                
                



                if(rating ===0) rating=1;
                
                VideoUrl= (
                    videourl.map((video,index)=>{

                    let VideoNumber ='video'+index;
                   
                    if(this.state[VideoNumber]){

                        playButton='VideoSelected';
                        playingVideo=true;
                    
                    }
                    else{
                        playButton='VideoNotSelected';
                        playingVideo=false;
                       
                    }

                    if(this.state['video'+index+'Completed']){
                        completed='VideoCompleted';
                    }

                    else if(!this.state['video'+index+'Completed']){
                        completed=false;
                    }
                
                
               return(

                    <VideoList
                    key={index}
                    video={video}
                    
                    changed={(event)=> this.VideochangeHandler(event,video,index,playingVideo)}
                    playButton={playButton}
                    completed={completed}
                    
                    title={'Video '+ index}
                    Duration={this.state['video'+index+'Duration']}
                    />)
            
                
                     } )
                );


        }
        
        if(this.state.progress===100){
        progressbar = <p>Congratulations {localStorage.getItem('userName')}!  
          <i class="fa fa-birthday-cake" style={{marginLeft:'5px'}} aria-hidden="true"></i></p>
        }

        else{
            progressbar=(<>
             <p>You have Completed <b>{this.state.progress.toPrecision(2)}% </b> of your course!</p>
                            <ProgressBar variant="success" now={this.state.progress} />
            </>);
        }
       


        return(

          
          <Layout >
            <div className="coursePage">
            
            <div className="container">
                                
                <nav aria-label="breadcrumb">

                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <NavLink to='/home'>
                                    Home
                                </NavLink></li>

                            <li class="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseName}`}

                                >
                                    {this.state.CourseName}
                                </NavLink>
                            </li>


                            <li className="breadcrumb-item">
                                <NavLink to={`/course/${this.state.CourseName}/${this.state.CourseId}`}

                                activeStyle={{textDecoration:'underline'}}>
                                    {title}
                                </NavLink>
                            </li>

                        </ol>
                
                </nav>

                    <div className="Main-Section">
                    
                        

                        <div className="Description-main">
                            <CourseDesc title={title}
                                        short_description={short_description}
                                        teacher={teacher}
                                        createdat={createdAt}
                                        CourseId={this.state.CourseId}
                                        rating={rating}
                                        ratingtimesUpdated={ratingtimesUpdated}
                                        CourseName={this.state.CourseName}
                            />

                        </div>

                            <div className="Course-Video">
               

                                <CourseVideo playing={this.state.playing} 
                                    videoUrl={CurrentVideo}
                                    index={this.state.index}
                                    videoCompleted={this.videoCompleted}
                                    videoDuration={this.videoDuration}
                                    
                                              />
                            </div>


                     </div>


            <div className="Breakpoint"></div>

           <div className="Section2">
                
                <div className="section2part1">
                
                        <div className="Small-nav-section">

                            <p >About</p>
                            {/* <p>Instructor</p>
                            <p>About</p> */}


                        </div>


                            
                        <div className="flex-col-requirement">
                            
                            <h1>Requirement of this Course</h1>
                            <p>{requirement}</p>
                    
                        </div>

                            
                        <div className="flex-col-requirement">
                            
                            <h1>Descripton</h1>
                            <p>{ longDescription}</p>
                    
                        </div>

                        <div className="flex-col-requirement">
                            
                            <h1>What will you learn from this course?</h1>
                            <p>{willLearn}</p>
                    
                        </div>


                 </div>

                    <div className="flex-center">
        
                        {VideoUrl}
                        <div className='progressBar'>
                            
                           {progressbar}
                        </div>
                     </div>

                    

            </div>

       
            


        </div>
        </div>
        </Layout>

        );
    }

}

export default CoursePage;