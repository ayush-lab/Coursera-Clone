import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../../../components/Layout/Layout';
import AuthService from '../../../../ApiServices/auth.service';
import '../Form.css';
import Alert from '../alert';
import Input from '../../../../components/UI/Input/FormInput';
import MainPage from '../../../../components/UI/MainPage/MainPage';
import SpinnerButton from '../../../../components/UI/Spinners/SpinnerButton';
import SumbitButton from '../../../../components/UI/Buttons/SumbitButton';

class ForgotPasswordotp extends Component {

    state = { 
            Form:{
                 otp: {

                    placeholder: 'Enter your OTP',
                    value: "",
                    valid: false,
                    type: 'number',
                    error: " ",
                    msg: '',
                    touched: false,
                
            },

        },
        loading:false,
        email:localStorage.getItem('email'),
        
        redirect:null,

        alert: {
            valid:localStorage.getItem('valid'),
            msg:localStorage.getItem('msg'),
            alertType:localStorage.getItem('type'),
        }
       
    }
    

    AlertError(alertmsg, alertType) {
        const AlertArray = {...this.state.alert};
        AlertArray.msg = alertmsg;
        AlertArray.valid=true;
        AlertArray.alertType=alertType;
        this.setState({alert:AlertArray});
    
    }
    
    


//   runs whenever there is any change in the input field

    inputchangeHandler = (event,inputIdentifier)=> {

        const updatedForm = {
            ...this.state.Form
        }
        const updatedElement = {...updatedForm[inputIdentifier]}
     
        updatedElement.value = event.target.value;

        if(updatedElement.value.length>0) 
            updatedElement.touched=true;

        else {updatedElement.touched=false;
              updatedElement.error="";  
        }
        
      

        updatedForm[inputIdentifier] = updatedElement;
        this.setState({Form: updatedForm});

    }
   

    formHandler = (event)=> {
        event.preventDefault();
         
      
            this.setState({loading:true});
        
            let formData ={};

            for(let formElement in this.state.Form){
                    formData[formElement]=this.state.Form[formElement].value
            }

           formData.email = this.state.email;
             
            
            AuthService.VerifyOtp(formData)
                .then(response => {
                    console.log('otpverify:Response:', response) 
                    this.setState({loading:false})    
                    this.setState({redirect:'/ResetPassword'})
                })
                
                .catch(error=>{console.log(error.response); this.setState({loading:false});
                    this.AlertError(error.response.data.message, "danger");});

                
        }
       // else this.AlertError("Make sure the Validations are correct", "warning");
    render() {
    
        let alertContent = null;

        let value=0;
        value= !value;

        if(this.state.alert.valid){
            alertContent = ( <Alert value={value} alertMsg ={this.state.alert.msg}
                                    alertType={this.state.alert.alertType} /> )}

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

        let SigninSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Confirm OTP"}/>;
   
        if(this.state.loading){
            SigninSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

        let form = (
          <div className="login-form-otp">
              
            <form onSubmit={this.formHandler} >
            
                {
                    formElementsArray.map(x=> (

                      <Input 
                        key={x.id}
                        placeholder={x.config.placeholder}
                        value={x.config.value}
                        type={x.config.type}
                        invalid={!x.config.valid}
                        changed={(event)=> this.inputchangeHandler(event,x.id)}/>

                    ))
                }
               {/* <p className="forgot-password" onClick={this.resendotp}> Resend Otp?</p> */}
                {SigninSumbitButton}
                <p className="account-login"> Already have an account? <a href="/">Login</a></p>
                 <hr/>
         
            </form> 
            </div>
        );

        return (<Layout>
            {alertContent}
      
            <div className="SideContent">
                
                <MainPage 
                heading1={"Please Verify"}
                heading2={"your Email Address"}/>

                    {form}
            </div>
        </Layout>
        );
    }
  
}


export default  ForgotPasswordotp;