import React, {Component} from 'react';
import Categories from './Categories';
import HomeBanner from './HomeBanner';
import CourseCards from './CourseCards';
import HomeProgressCourse from './HomeProgressCourse';
import CourseTitle from './CourseTitle';
import {NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Layout from '../../Layout/Layout'
import AuthServices from './../../../ApiServices/auth.service';
import Recommendation from './Recommendation';
import './CSS/Homepage.css';



class Homepage extends Component {

    state = {
        CourseLink: this.props.match.params.CourseName,
        Courses: null,
        loading: true,
        img: "",
        progress:0,
    }


    componentDidMount(){

        const fd =new FormData();
        const form = {};
        form['userId']=localStorage.getItem('userId');
        fd.append("userId",localStorage.getItem('userId'))

       
       if(this.state.CourseLink === "preferences"){
    
        AuthServices.PreferenceCourse(this.state.CourseLink,form)
        .then(response => {
            console.log("Courses Response",response);
            
            this.setState({Courses: response.data.coursesarray});
           
            this.setState({loading:false});
          //  console.log(this.state.Courses);

          

        })
        .catch(error => {
            console.log(error);
        })
       
       }
       
       else{    

        AuthServices.HomepageCourse(this.state.CourseLink)
                .then(response => {
                    console.log("Courses Response",response);
                    
                    this.setState({Courses: response.data.course});
                
                    this.setState({loading:false});
                    let count=0;
                    for(let j in response.data.course.videoContent){ 
                        for (let i in response.data.course.videoContent[j].usersWatched){
                            if(localStorage.getItem('userId')===response.data.course.videoContent[j].usersWatched[i]){
                                
                                count+=1;
                                
                                break;
                            }
                        }
                    }
                    
                   
                  let progress = (count/response.data.course.videoContent.length)*100;
                  this.setState({progress:progress})
                    console.log(progress);

                })
                .catch(error => {
                    console.log(error);
                })
        }

    }
   
    
    


    render(){

        let BannerImage ;
        let ProgressData=null;

        let data = (<Loader
            type="Puff"
            color="#08BD80"
            height={50}
            width={50}
            className="loader"

             //3 secs
    
         />);

        if(!this.state.loading){
           
            let CourseArray= this.state.Courses.slice(0);

            data = (
              CourseArray.map(item =>  {
            
               let rating=item.rating.ratingFinal;
                if(rating ===0) rating=1;
                
              return(
              
              <NavLink className="productLink"
               exact to={`/course/${this.state.CourseLink}/${item._id}`}>
                <CourseCards   
                key={item._id}
                title={item.title}
                teacher={item.name}
                img={"https://shelp-webapp.herokuapp.com/" + item.imageurl}
                rating={rating}
                ratingtimesUpdated={item.rating.timesUpdated}
                /></NavLink>)
    
              })  );
            
            BannerImage =   this.state.CourseLink 
            
        if(true){
            ProgressData= (
                this.state.Courses.map(item =>  {
              
                 let rating=item.rating.ratingFinal;
                  if(rating ===0) rating=1;
                  
                return(
                
                <NavLink className="productLink"
                 exact to={`/course/${this.state.CourseLink}/${item._id}`}>
                  <HomeProgressCourse  
                  key={item._id}
                  title={item.title}
                  teacher={item.name}
                  img={"https://shelp-webapp.herokuapp.com/" + item.imageurl}
                  rating={rating}
                  ratingtimesUpdated={item.rating.timesUpdated}
                  progress={100}
                  /></NavLink>)
      
                })  );
        }

            };
        
        return(
          <Layout>
            <div className="container">

                <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <NavLink  to='/home'>
                                    Home
                                </NavLink></li>

                            <li className="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseLink}`}activeStyle={{textDecoration:'underline'}}>{this.state.CourseLink}
                                </NavLink>
                            </li>

                        </ol>
                
                </nav>

                <HomeBanner img={BannerImage}/>

                <div className="mt-3 Course-Content"> 
                    <Categories/>
                    <div className="Course-Content-col">
                   
                                <CourseTitle welcomeMessage ={"Welcome"}/>

                                <div className="Course-Content-wrap">
                                    {data}
                                </div>

                                <CourseTitle welcomeMessage ={"Welcome"}/>

                                <div className="Course-Content-wrap">
                                    {ProgressData}
                                </div>


                                <Recommendation/>

                    </div>

                </div>



            </div>
            </Layout>
        );
    }

}

export default Homepage;