import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from "../../../ApiServices/auth.service";
import '../Form.css';
import Input from '../../../components/UI/Input/FormInput';
import MainPage from '../../../components/UI/MainPage/MainPage';
import Layout from '../../../components/Layout/Layout';
//import Google_logo from '../../../components/UI/Logo/google';
import SpinnerButton from '../../../components/UI/Spinners/SpinnerButton';
import SumbitButton from '../../../components/UI/Buttons/SumbitButton';
import Alert from '../alert';


class ResetPassword extends Component {

    state = { 
            Form:{
                 
                email: {

                    placeholder: 'Email',
                    value: "",
                    valid: false,
                    type: 'email',
                    error: " ",
                    msg: '',
                    

                    validation: {
                        required: true,
                        regex:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
                       
                    },
                    touched: false,
                
            },

            newPassword: {

                    placeholder: 'New Password',
                    value: "",
                    valid: false,
                    type: 'password',
                    error: " ",
                    msg: '',

                    validation: {
                        required: true,
                        minLength:5,
                        maxLength:18
                    },
                    touched: false,
                
            },

            confirmPassword: {

                placeholder: 'Confirm New Password',
                value: "",
                valid: false,
                type: 'password',
                error: " ",
                msg: '',

                validation: {
                    required: true,
                    match:true,
                },
                touched: false,
            
        },

        },
        loading:false,
        redirect:null,
        
        alert: {
            valid:false,
            msg:"",
            alertType:" ",
        },

        alertPressed:false,
       
    }

    AlertError(alertmsg, alertType) {
        const AlertArray = {...this.state.alert};
        AlertArray.msg = alertmsg;
        AlertArray.valid=true;
        AlertArray.alertType=alertType;
        this.setState({alert:AlertArray});

    }



    checkValidity(value,rules){
        let isValid = true;
        const regex=rules.regex;

        if(rules.required){
            isValid =value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }
     
        
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid;
        }

        if(rules.regex){
            isValid = regex.test(value) && isValid;
        }

        if(rules.match){
            isValid = value === (this.state.Form['newPassword'].value) && isValid;
        }

        return isValid;
        
     }


//   runs whenever there is any change in the input field
inputchangeHandler = (event,inputIdentifier)=> {
    const updatedForm = {
        ...this.state.Form
    }
    const updatedElement = {...updatedForm[inputIdentifier]}
    

    updatedElement.value = event.target.value;

    updatedForm[inputIdentifier] = updatedElement;
    this.setState({Form: updatedForm});


    updatedElement.valid = this.checkValidity(updatedElement.value,
        updatedElement.validation);

}

inputBlurHandler = (event,inputIdentifier)=> {
    const updatedForm = {
        ...this.state.Form
    }
    const updatedElement = {...updatedForm[inputIdentifier]}
    

    if(updatedElement.value.length>0) 
        updatedElement.touched=true;

    else {updatedElement.touched=false;
          updatedElement.error="";  
    }
    
        
    // msg error for password
    if(inputIdentifier === "password" && !updatedElement.valid){
        updatedElement.error = "At least 5 characters and at most 18";
        updatedElement.msg="";
    }
    if(inputIdentifier === "newPassword" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="All good!";
    }
    // msg errors for email
    if(inputIdentifier === "email" && !updatedElement.valid){
        updatedElement.error = "check format";
        updatedElement.msg="";
    }
    if(inputIdentifier === "email" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="All good!";
    }

     // confirm password
     if(inputIdentifier === "confirmPassword" && !updatedElement.valid){
        updatedElement.error = "Passwords do not match";
        updatedElement.msg="";
    }
    if(inputIdentifier === "confirmPassword" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="All good!";
    }

    updatedForm[inputIdentifier] = updatedElement;
    this.setState({Form: updatedForm});

}
   
    OverallValidity = ()=>{

        for(let validate in this.state.Form){
            if(!this.state.Form[validate].valid){
                return false;
            }
        }
        return true;
    }




    formHandler = (event)=> {
        event.preventDefault();
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 2000);
         
        if(this.OverallValidity()){
            this.setState({loading:true});
           
           // localStorage.setItem('email',this.state.Form["email"].value);
         
            const formData ={};
            for(let formElement in this.state.Form){
                    formData[formElement]=this.state.Form[formElement].value;
            }
           


            
            AuthService.ResetPassword(formData) 
            .then(response => {console.log('Response:', response)

                if(response.status ===201 || response.status ===200){
                    //  localStorage.setItem('token', response.data.token) 

                    //  localStorage.setItem("valid",true);
                    //  localStorage.setItem("type","success");
                    //  localStorage.setItem("msg",response.data.message);
                   
                     this.setState({ redirect: "/login" });
                }
                 

                else 
                    this.AlertError("Something went wrong", "danger")})
                  //  alert("Something went wrong")})

            .catch(error=>{console.log(error);
                 this.setState({loading:false})
                 this.AlertError("Something went wrong", "danger")} );
            
            

        }
        
        else{ 
         this.AlertError("Make sure the Validations are correct", "warning");
       

        }

    }

    

    render() {
        

        let alertContent = null;
        
        let value=0;
        value= !value;

        if(this.state.alert.valid){
            alertContent = ( <Alert value={this.state.alertPressed} 
                alertMsg ={this.state.alert.msg} 
                alertType={this.state.alert.alertType} /> )
        }
        
        

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        const formElementsArray =[];
        for(let key in this.state.Form ){
            formElementsArray.push({
                id:key,
                config:this.state.Form[key]
            });

        };

        let SigninSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Reset Password"}/>;
   
        if(this.state.loading){
            SigninSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

        let form = (
          <div className="login-form">
            
            <form onSubmit={this.formHandler} >
            
                {
                    formElementsArray.map(x=> (

                      <Input 
                        key={x.id}
                        placeholder={x.config.placeholder}
                        value={x.config.value}
                        type={x.config.type}
                        invalid={!x.config.valid}
                        touched={x.config.touched}
                        errors={x.config.error}
                        msg={x.config.msg}
                        blur={(event)=> this.inputBlurHandler(event,x.id)}
                        changed={(event)=> this.inputchangeHandler(event,x.id)}/>

                    ))
                }
               
                {SigninSumbitButton}
                <p className="account-login"> Already have an account? <a href="/">Login</a></p>
                 {/* <hr/>

                 <p className="Link-teach" onClick={this.product} >Teach on S-help</p>           */}
            </form> 
            </div>
        );

        return (
           <Layout>
                {alertContent}
                
                <div className="SideContent">
                        <MainPage 
                        shelp={false}
                        heading1={"Reset Your"}
                        heading2={"Password"}/>

                            {form}
                    </div>
        </Layout>
        );
    }
  
}


export default ResetPassword;