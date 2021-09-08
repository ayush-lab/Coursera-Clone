import React, {Component} from 'react';
import Layout from '../../../../components/Layout/Layout';
import AuthService from "../../../../ApiServices/auth.service";
import '../Form.css';
import { Link,Redirect } from 'react-router-dom';
import Input from '../../../../components/UI/Input/FormInput';
import SpinnerButton from '../../../../components/UI/Spinners/SpinnerButton';
import MainPage from '../../../../components/UI/MainPage/MainPage';
import SumbitButton from '../../../../components/UI/Buttons/SumbitButton';
import Alert from '../alert';

class EmailVerify extends Component {

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
    
    
    // msg errors for email
    if(inputIdentifier === "email" && !updatedElement.valid){
        updatedElement.error = "check format";
        updatedElement.msg="";
    }
    if(inputIdentifier === "email" && updatedElement.valid){
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
        
        AuthService.VerifyEmail(formData)
            .then(response => {
          
                console.log('VerifyEmail:', response)
            
                    // alert(response.data.message);
                    localStorage.setItem('email',this.state.Form['email'].value);
                    //    localStorage.setItem('userId',response.data.userId);
                    //    localStorage.setItem('userName',response.data.username);
                    this.setState({loading:false})
                    this.setState({redirect:'/ForgotPasswordotp'})
                    
            })

        .catch(error=>{
            console.log(error.response); 
            this.setState({loading:false});
            this.AlertError(error.response.data.message, "danger")})
            
        }
        
        else this.AlertError("Make sure the Validations are correct", "warning");
    }


   


render() {

    let value=0;
    value= !value;
    let alertContent = null;

    if(this.state.alert.valid){
        alertContent = ( <Alert value={this.state.alertPressed} alertMsg ={this.state.alert.msg} 
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

    let LoginSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Submit"}/>;
   
    if(this.state.loading){
        LoginSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

    let form = (
      <div className="login-form-otp ">
          
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
            <Link to="/login"> 
            <p className="forgot-password"  >Back to Login</p></Link>

            {LoginSumbitButton}
            <p className="account-login"> New User? <a href="/signup">Sign up</a></p>
         

               
        </form> 
        </div>
    );
        


        return (<Layout>
                    {alertContent}
                    <div className="SideContent">
                        
                        <MainPage
                        shelp={false}
                        heading1={"Reset Password,"}
                        heading2={"Enter your Email"}/>

                            {form}
                    </div>
            </Layout>
        );
    }
  
}

export default EmailVerify;