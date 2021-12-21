import React, {Component} from 'react';
import AuthService from "../../../../ApiServices/auth.service";
import Layout from '../../../../components/Layout/Layout';
import '../Form.css';
import { Link,Redirect } from 'react-router-dom';
import Input from '../../../../components/UI/Input/FormInput';
import SpinnerButton from '../../../../components/UI/Spinners/SpinnerButton';
import MainPage from '../../../../components/UI/MainPage/MainPage';
import Google_logo from '../../../../components/UI/Logo/google';
import GoogleLogin from 'react-google-login';
import SumbitButton from '../../../../components/UI/Buttons/SumbitButton';
import Alert from '../alert';

class Login extends Component {

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
                    regex:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
                   
                },
                touched: false,
            
        },

            password: {

                placeholder: 'Password',
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

    },
    loading:false,
      
    alert: {
        valid:false,
        msg:"",
        alertType:"",
    },

    redirect:null,
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
    const regex = rules.regex;
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
    if(inputIdentifier === "password" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="valid";
    }
    // msg errors for email
    if(inputIdentifier === "email" && !updatedElement.valid){
        updatedElement.error = "Invalid format";
        updatedElement.msg="";
    }
    if(inputIdentifier === "email" && updatedElement.valid){
        updatedElement.error="";
        updatedElement.msg="valid";
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

timeout = ()=> {
    let temp ={...this.state.alert}
    temp.msg=''
    temp.alertType=''

     this.setState({alert:temp,alertPressed:false}) 
}


formHandler = (event)=> {
    event.preventDefault();
    this.setState({alertPressed:true})

    setTimeout(this.timeout , 3000);

     if(this.OverallValidity()){

        this.setState({loading:true});
        const formData ={};
        for(let formElement in this.state.Form){
                formData[formElement]=this.state.Form[formElement].value;
        }
        
        localStorage.setItem('email',this.state.Form["email"].value);
        
        AuthService.login(formData)
        .then(response => {
          
            console.log('Response:', response)

                this.AlertError("Successfully Logged in", "success");
  
                localStorage.setItem('user',response.data.access_token);
                localStorage.setItem('ref_token',response.data.referesh_token);
                localStorage.setItem('userId',response.data.userId);
                localStorage.setItem('userName',response.data.username);
                
                this.setState({loading:false})
                this.setState({redirect:'/HomePage'})})
             
      
        .catch(error=>{console.log(error.response); 
            this.setState({loading:false});
            this.AlertError(error.response.data.message, "danger");
            if(error.response.data.redirect){
                this.setState({redirect:'signup/otp'})
            }

          });
        }
        
        else this.AlertError("Make sure the Validations are correct", "warning");
    }

    // google authentication using Oauth2
    responseGoogle = (response)=>{
        console.log(response)
        const form={};
        form['tokenId']=response.tokenId;
        
        AuthService.Google_login(form)
        .then(response=>{
            console.log(response)
            localStorage.setItem('user',response.data.access_token);
            localStorage.setItem('ref_token',response.data.referesh_token);
            localStorage.setItem('userId',response.data.userId);
            localStorage.setItem('userName',response.data.username);

            this.setState({redirect:'/HomePage'})
                
        })
        .catch(error=>{
            console.log(error); 
            this.AlertError(error.response.data.message, "danger");
          });
    }

    FailResponseGoogle = ()=>{
        console.log("something is wrong");
    }

   
render() {
    
   localStorage.removeItem('valid');
   localStorage.removeItem('msg');
   localStorage.removeItem('type');

    let alertContent = null;

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

    let LoginSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Login"}/>;
   
    if(this.state.loading){
        LoginSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

    let form = (
      <div className="login-form">
      
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_KEY}
            render={renderProps => (
            <button onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    className="google-btn"> <Google_logo/>  Continue using google</button>
            
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.FailResponseGoogle}
            cookiePolicy={'single_host_origin'}/>

          <p className="devider-or">OR</p>
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
            <Link to="/forgotpasswordemail"> 
            <p className="forgot-password"  > Forgot Password?</p></Link>

            {LoginSumbitButton}
           <p className="account-login"><Link to='/signup'>  New User? Sign up</Link></p>
         

               
        </form> 
        </div>
    );
        


        return (<Layout>
                    {alertContent}
                    <div className="SideContent">
                        
                        <MainPage
                        shelp={true}
                        heading1={"Resume your"}
                        heading2={"learning with"}/>

                            {form}
                    </div>
            </Layout>
        );
    }
  
}

export default Login;