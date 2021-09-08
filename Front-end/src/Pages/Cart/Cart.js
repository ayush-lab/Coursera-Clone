import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CartCard from './CartCard';
import './CSS/Cart.css';
import Layout from '../../components/Layout/Layout';
import EmptyCart from './EmptyCart';
import AuthServices from '../../ApiServices/auth.service';
import Url from '../../ApiServices/BackendUrl';

class Cart extends Component{

    state = {
        CourseLink: this.props.match.params.CourseName,
        Courses: null,
        loading: true,
        img: "",
        userName:localStorage.getItem('userName'),
        userId:localStorage.getItem('userId'),
        token:localStorage.getItem('user'),
        redirect:null,
    }


    componentDidMount(){
       AuthServices.bookmarkCourses(this.state.userName,this.state.userId) 
        .then(response => {

            console.log("Bookmarked Courses",response);
            this.setState({Courses: response.data.course.Bookmark});            
            this.setState({loading:false});                      
        })
        .catch(error => {
            console.log(error.response);
        })
       
    }

    remove =(id)=> {
       
        const form ={};
        form['userId']=this.state.userId;
        form['id']=id;
        let answer =  window.confirm("Are you sure to remove this from bookmark?")
        if(answer){
            AuthServices.DeleteBookmark(form)
            .then(response => {
                console.log("Removed",response);
                this.setState({loading:false});
                const updatedCourse =this.state.Courses;
                for(let i=0;i<this.state.Courses.length;i++){                
                    if(id=== this.state.Courses[i]._id){
                    updatedCourse.splice(i,1);
                    }
                this.setState({Courses:updatedCourse})
                }
            })
            .catch(error => {
                console.log(error.response);
            })
        }
        
    }

    render(){

        if(this.state.redirect!==null){
            return <Redirect to={this.state.redirect}/>
        }

        let noOfCourses = null;
        let classes=[];
        let title=null;
        
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
            noOfCourses = CourseArray.length;

            if(CourseArray.length ===0){
                
                data=(<div className="empty-center">
                    <EmptyCart/>
                    </div>);
            }



           else{

            title= (<div>

           <div className='row'>
               <div className="col-12">
                   <p className="CartTitle" >My Courses</p>
                </div>
            </div>

                 
           <div className='row'>
               <div className="col-12">
                   <p className="CartSubTitle" >You have {noOfCourses} Courses!</p>
                </div>
            </div>
            </div>);

              classes =["flex-row"]
              data = (
              CourseArray.map((item,index)=> {
              
                let rating = item.rating.ratingFinal;
                if(rating ===0) rating =1;
                return(
               <CartCard 
                    key={index}
                    title={item.title}
                    teacher={item.name}
                    img={Url  + item.imageurl}
                    rating={parseInt(rating)}
                    courseId={item._id}
                    price={item.price}
                    Link={`/course/${this.state.CourseLink}/${item._id}`}
                    remove={()=>this.remove(item._id)}

                />

              )})
    
            );
        }}

        return(
        <Layout>
            <div className="container">
            
                {title}
    
            <div className={classes.join(' ')}>
                {data}
            </div>

            </div>
        </Layout>
    );
}}

export default Cart;
