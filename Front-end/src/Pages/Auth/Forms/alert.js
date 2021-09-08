import React, {Component} from 'react';
import './alert.css';



class alert extends Component{


  state = {
    unvisible: false,
    

  }
    


  render(){ 
  
 
        let AlertColors = ["alertbox","alert", "alert-dismissible", "fade", "show"];

        if(this.props.alertType === "warning"){
          AlertColors.push("alert-warning");
        }

        
        if(this.props.alertType === "danger"){
          AlertColors.push("alert-danger");
        }

        if(this.props.alertType === "success"){
          AlertColors.push("alert-success");
        }

        if(!this.props.value){
          AlertColors.push('unvisible');
        }

        else if(this.props.value===true){
          const index =AlertColors.indexOf('unvisible');
            if(index >-1) AlertColors.splice(index,1);
        }
        

    return(

    <div style={{position: 'fixed'}} className={AlertColors.join(' ')} role="alert">

    {this.props.alertMsg}
   

  </div>



    )}}

export default alert;