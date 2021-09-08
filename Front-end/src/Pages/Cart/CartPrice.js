import React from 'react';
//import Webdev from '../../../assets/Images/webdev.png';
import './CSS/CartPrice.css';

const CartPrice =(props)=> {


    return(

   <div>
        <div className="Price-Buy">Buy all Courses together Now</div>
        
        <div className="CartPriceBag">
            
            <div className="row">
                <div className="col-xs-12 offset-lg-4 col-lg-3">
                    <p className="TotalamountText">Total amount</p>
                </div>

                <div className="col-lg-4" >
                    <p className="TotalValue">₹ 500</p>
                </div>

            
            </div>


            <div className="row">
                <div className="offset-2 col-10 offset-lg-7 col-lg-2">
                    <p className="BuyNowBtn">Buy Now</p>
                </div>
            </div>
        </div>
   </div>
    );

}

export default CartPrice;
