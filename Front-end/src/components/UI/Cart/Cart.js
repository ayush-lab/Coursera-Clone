import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CartCard from './CartCard';
import './CSS/Cart.css';
import Layout from '../../Layout/Layout';
import EmptyCart from './EmptyCart';
import AuthServices from '../../../ApiServices/auth.service';


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
            if(error.response.status ===500){
                localStorage.clear();
                this.setState({redirect:"/login"})
            }

        })
       
    }

    remove =(event,id)=> {
        // this.setState({alertPressed:true})
        // setTimeout( ()=> this.setState({alertPressed:false}) , 3000);

       
        const form ={};
        form['userId']=this.state.userId;
        form['id']=id;

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
              CourseArray.map(item => {
              
                let rating = item.rating.ratingFinal;
                if(rating ===0) rating =1;
                return(
               <CartCard 
                key={item.id}
                title={item.title}
                teacher={item.name}
                img={"http://localhost:8080/"  + item.imageurl}
                rating={rating}
                courseId={item._id}
               // userId={this.state.userId}
                Link={`/course/${this.state.CourseLink}/${item._id}`}
                remove={(event)=>this.remove(event,item._id)}

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


            {/* <CartPrice/>  */}
           
            
        </div>
        </Layout>
    );
}}

export default Cart;
