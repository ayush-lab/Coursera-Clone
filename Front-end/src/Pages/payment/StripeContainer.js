import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import Navbar from '../../components/UI/Navigation/Navbar/Navbar';
import AuthService from '../../ApiServices/auth.service';

const Stripe = (props) => {

  const [courseLink,] = React.useState(props.match.params.CourseLink);
  const [course,setCourse]= React.useState(null);

  const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

  React.useEffect( ()=>{
    console.log(courseLink)
      AuthService.StripePayment_course(courseLink)
      .then(response => {
          console.log('Response:', response)
          setCourse(response.data.course)
      }) 
          
      .catch(error=>{console.log(error.response); 
        
          
      })

  }, []);

  let courseName=null;
  let teacherName=null;
  let price=null;
  let courseId=null;

  if(course!=null){
     courseName= course.title;
     teacherName=course.name;
     price= course.price;
     courseId=course._id;
     console.log(course._id)
  }


  return (
    <>
    <Navbar/>
      <Elements  stripe={stripeTestPromise}>
        <CheckoutForm courseName={courseName} price={price} teacherName={teacherName} courseId={courseId}/>
      </Elements>
   </>
  );
};

export default Stripe;