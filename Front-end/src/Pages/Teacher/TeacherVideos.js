import React,{Component} from 'react';
//import Aux from '../../../hoc/ReactFrag';
//import Scroll from 'react-scroll';
//import Tinput from './TinputFields';
//import TeacherTittle from './TeacherTittle';
import Layout from '../../components/Layout/Layout';
import {Redirect} from 'react-router-dom';
import './CSS/Teacher.css';
import axios from '../../ApiServices/axiosUrl';
import AuthServices from '../../ApiServices/auth.service';
import Alert from '../Auth/Forms/alert';
import ProgressBar from 'react-bootstrap/ProgressBar'




class TeacherPage extends Component{


    state = { 
        Form:{

          
            file:{
                value:[],
                
                validation: {
                    required: true,
                    
                },
                valid1:false,
                valid2:false,
                valid3:false,
                valid4:false,
                valid5:false,

            },

           

            
     
    },
     
    alert: {
        valid:false,
        msg:"",
        alertType:" ",
        
    },
    
    isLoggedIn:false,
    userName:"",
    alertPressed:false,
    redirect:null,
    uploadedPercentage:0,
    
}

    componentDidMount(){
        let userToken = AuthServices.getCurrentUser();
        let userName= AuthServices.getUserName();
        if(userToken!==null){
            this.setState({isLoggedIn:true,userName:userName});
        }
        
    }
 
     OverallValidity = ()=>{

      if(this.state.Form.file.valid1 ||  this.state.Form.file.valid2 ||  this.state.Form.file.valid3 ||  
        this.state.Form.file.valid4 ||  this.state.Form.file.valid5)
        return true;

      else return false;
    }
    
    
    AlertError(alertmsg, alertType) {
        const AlertArray = {...this.state.alert};
        AlertArray.msg = alertmsg;
        AlertArray.valid=true;
        AlertArray.alertType=alertType;
        this.setState({alert:AlertArray});

    }

    fileSelectorHandler = (event,index) =>{
    
        const selectedfile= {...this.state.Form};

        selectedfile.file.value.push( event.target.files[0]);
        selectedfile.file.name= URL.createObjectURL(event.target.files[0]);
        selectedfile.file['valid'+index]=true;

        this.setState({Form:selectedfile })
        console.log(selectedfile)  
    }

    sumbitButton =()=> {
        
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 2000);
        
        const fd = new FormData();
       
        for(let i=0;i<this.state.Form['file'].value.length;i++){
            fd.append('file',this.state.Form['file'].value[i])
               
        }
    
        if(this.OverallValidity()){

                axios.post(`/creator/videoUpload/${this.props.location.state.CourseId}`,fd,{
                    onUploadProgress: progressEvent => {
              
                        const {loaded,total} =progressEvent;
                        let percent =Math.floor((loaded*100)/total);
                        console.log("percent" + percent)
                        if(percent<100){
                            this.setState({uploadedPercentage:percent})
                        }
                    }
                },{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": '*',
                        Authorization: 'Bearer '+ localStorage.getItem('user') + " " + localStorage.getItem('ref_token')
                    }
                })
                .then( res=> { console.log(res);

                    this.AlertError("Your Course has been saved!", "success");
                     setTimeout( ()=> this.setState({redirect:'/home'}) , 2000);
                
                })

                .catch(error => { console.log(error.response)
                    this.AlertError(error.response.data.message, "danger");
                    if(error.response.data.message ==="jwt malformed" )
                        this.setState({redirect:"/login"})
                });
        
        }
        else
            this.AlertError("Validation Error,Upload atleast one video!", "warning");
    }
    render(){
//console.log(this.props.location.state.CourseId)
        let fileName1=null;
        let fileName2=null;
        let fileName3=null;
        let fileName4=null;
        let fileName5=null;

        let alertContent=null;
        let Welcome=null;
        let uploadedPercentage = this.state.uploadedPercentage;

        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
       
       
        
        if(this.state.Form.file.value[0]){
            fileName1=this.state.Form.file.value[0].name;
            
       }

        if(this.state.Form.file.value[1]){
            fileName2=this.state.Form.file.value[1].name;
            
    }


        if(this.state.Form.file.value[2]){
            fileName3=this.state.Form.file.value[2].name;
            
        }


        if(this.state.Form.file.value[3]){
            fileName4=this.state.Form.file.value[3].name;
            
        }


    if(this.state.Form.file.value[4]){
        fileName5=this.state.Form.file.value[4].name;
        
    }

      
        

        if(this.state.alert.valid){
            alertContent = ( <Alert alertMsg ={this.state.alert.msg} 
                                    alertType={this.state.alert.alertType} 
                                    value={this.state.alertPressed}/> )
        }
        
        if(this.state.isLoggedIn) {
            Welcome = <p > Upload upto 5 Videos</p>;
        }
          
      

        return(

          
<Layout>
        <div className="">

                 {alertContent}

            <div className="Welcome-msg">
                
                    {Welcome}

            </div>


        {/* <div className="Teacher-Head-Class-Video">
           <img src={Cloud} alt="cloud"/>
            <p className="cloudpng">Upload your content</p>
        </div> */}

            <div className="Teacher-Head-ClassVideo">
            
            
                <label className="videoUpload">
                    <input type="file" name='file'
                    
                    onChange={(event)=> this.fileSelectorHandler(event,1)}/>
                    Upload Video1
                </label>

                <p className="VideoName">{fileName1}</p>
            
            </div>
            

           
            



            <div className="Teacher-Head-ClassVideo">
            
            
                <label className="videoUpload">
                    <input type="file" name='file' 
                    onChange={(event)=> this.fileSelectorHandler(event,2)}/>
                    Upload Video2
            </label>

            <p className="VideoName">{fileName2}</p>
           

            
            </div>



            <div className="Teacher-Head-ClassVideo">
            
            
                <label className="videoUpload">
                    <input type="file" name='file' 
                    onChange={(event)=> this.fileSelectorHandler(event,3)}/>
                    Upload Video3
            </label>

            <p className="VideoName">{fileName3}</p>
            

            
            </div>



            <div className="Teacher-Head-ClassVideo">
            
            
                <label className="videoUpload">
                    <input type="file" name='file' 
                    onChange={(event)=> this.fileSelectorHandler(event,4)}/>
                    Upload Video4
            </label>

            <p className="VideoName">{fileName4}</p>
            

            
            </div>



            <div className="Teacher-Head-ClassVideo">
            
            
                <label className="videoUpload">
                    <input type="file" name='file' 
                   onChange={(event)=> this.fileSelectorHandler(event,5)}/>
                    Upload Video5
                </label>

            <p className="VideoName">{fileName5}</p>
           

            
            </div>
            

            <div className="Welcome-msg sumbitVideoBtn">
                <button onClick={this.sumbitButton} >Submit </button>
            </div>

            

        

          <div className="progressBar">
              {uploadedPercentage>0 ? <ProgressBar animated now={uploadedPercentage}
                    label={`${uploadedPercentage}%`}/> :null }
          </div> 

          
            

          
        </div>

  
        
    </Layout>

        );
    }
}

export default TeacherPage;