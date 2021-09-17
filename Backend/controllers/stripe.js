const api_key=require('../config/config');
const stripe = require("stripe")(api_key.stripePayment);
const Course = require('../model/courses')

exports.stripeCourse =(req,res)=>{
    const courseId = req.params.courseId;
    Course.findById({_id:courseId})
    .then(course=>{
        res.status(200).json({course:course})
    })
    .catch(err=>{
        console.log(err)
    })
}


exports.stripePayment=(req,res)=>{

    let {amount,id} = req.body;
    console.log(amount,id);

    stripe.paymentIntents.create({
        amount:amount,
        currency:"inr",
        description: "Coursera clone just testing",
        payment_method: id,
        confirm: true,
    }).then(response=>{
        console.log(response);
            res.status(200).json({
            message:"payment successful",
            success:true})}
    )
    .catch(err=>{
        console.log(err);
        res.json({
            message: "Payment Failed",
            success: false,})
    })
}


