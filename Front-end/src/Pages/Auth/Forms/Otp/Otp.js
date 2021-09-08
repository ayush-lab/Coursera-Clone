import React, {Component} from 'react';
import { Redirect,Link } from 'react-router-dom';
import AuthService from '../../../../ApiServices/auth.service';
import '../Form.css';
import Alert from '../alert';
import Input from '../../../../components/UI/Input/FormInput';
import MainPage from '../../../../components/UI/MainPage/MainPage';
import SpinnerButton from '../../../../components/UI/Spinners/SpinnerButton';
import SumbitButton from '../../../../components/UI/Buttons/SumbitButton';
import Layout from '../../../../components/Layout/Layout';

class Otp extends Component {

    state = { 
            Form:{
                 otp: {

                    placeholder: 'Enter your OTP',
                    value: "",
                    valid: false,
                    type: 'number',
                    error: " ",
                    msg: '',

                    // validation: {
                    //     required: true,
                    //     minLength:6,
              
                    // },

                    touched: false,
                
            },

        },
        loading:false,
        Signup_token:localStorage.getItem('token'),
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

            formData.token = this.state.Signup_token;
            formData.email=this.state.email;
            
            AuthService.otp(formData)
            .then(response => {console.log('Response:', response) 

                 this.setState({loading:false})    


                 localStorage.removeItem('token') 
                 localStorage.removeItem('email') 
                 localStorage.removeItem('valid') 
                 localStorage.removeItem('msg') 
                 localStorage.removeItem('type') 

                 localStorage.setItem('user',response.data.access_token);
                 localStorage.setItem('ref_token',response.data.referesh_token);
                 localStorage.setItem('userId',response.data.userId);
                 localStorage.setItem('userName',response.data.username); 
                 this.setState({redirect:'/HomePage'})
        })
            
            .catch(error=>{console.log(error.response); this.setState({loading:false});
             this.AlertError(error.response.data.message, "danger");});
        
       // else this.AlertError("Make sure the Validations are correct", "warning");
    }
    

    resendotp = ()=>{
        let formData ={};
        formData.token=this.state.Signup_token;
        formData.email=this.state.email;
    
        AuthService.otpResend(formData)
            .then(response => {console.log('Response:',response)
            this.AlertError("Please Check Your Email, Otp has been Re-sent to your Email Address", "success");
            if(response.status ===201 || response.status ===200) 
                {localStorage.removeItem('token') 
                 localStorage.removeItem('email') 
               
                }
            else alert("Something went wrong")})

            .catch(error=>{console.log(error); 
                this.AlertError("Make sure the Validations are correct", "warning")});
        
    }


    render() {
       
    
        let alertContent = null;
        
        let value=0;
        value= !value;

        if(this.state.alert.valid){
            alertContent = ( <Alert value={value} alertMsg ={this.state.alert.msg}
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
                     //   touched={x.config.touched}
                      // errors={x.config.error}
                     //   msg={x.config.msg}
                        changed={(event)=> this.inputchangeHandler(event,x.id)}/>

                    ))
                }
               <p className="forgot-password" onClick={this.resendotp}> Resend Otp?</p>
                {SigninSumbitButton}
                <p className="account-login"><Link to='/login'> Already have an account? Login</Link> </p>
                 <hr/>
         
            </form> 
            </div>
        );

        return (  <Layout>
            {alertContent}
      
            <div className="SideContent">
                
                <MainPage 
                heading1={"Please Verify "}
                heading2={"your Email Address"}/>

                    {form}
            </div>
           </Layout>
        );
    }
  
}


export default Otp;