import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Empty from '../../assets/Images/EmptyCart.png';
import './CSS/EmptyCart.css';

class EmptyCart extends Component{


    render(){

    

    return(

        

   <div className="EmptyCartMain">

        <div className="EmptyCartLogo" >
            <img  src={Empty} alt="emptyCart"/>
        </div>

        <div className="EmptyCartDesc">
            <p>No Courses found</p>
        </div>

        <div>
          <Link to="/home/all">  <button className="HomeButton">Go Home</button></Link>
        </div>

   </div>
    );

}}

export default EmptyCart;
