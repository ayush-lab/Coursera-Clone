import React from 'react';
import './Chat.css';
import Profile from '../../assets/Images/user.png'
import Admin from '../../assets/Images/admin.png'

export default function Chatbox({admin,ReceivedMessage,user,history}){

    return(
     <div className="Chat" > 
        
        {history.length!==0?
          history.map((message,index)=>{
            if(message.UserName === user){
              return(<div key={index}className="Chat_right">
                        <div className="Chat_Profile_right">
                          <img src={Profile} alt="display person avatar"/>
                          <p>{message.UserName}</p>
                        </div>
                  
                        <div className="Chat_message">
                            <p>{message.Message}</p>
                        </div>
                      
                      </div>) 
            }
            else{
              return (
                <div key={index} className="Chat_left">
                    <div className="Chat_Profile_left">
                    <img src={Profile} alt="display person avatar"/>
                    <p>{message.UserName}</p>
                    </div>
             
                    <div className="Chat_message">
                        <p>{message.Message}</p>
                    </div>
                
                </div>)
            }
          }):null
        }


      {admin!=null ?  <div className="admin">
                          <div className="adminImage"><img src={Admin} alt="admin display person avatar"/></div>
                          <span>{admin.Message}</span>
                        </div> :null} 

        {ReceivedMessage.length!==0?
           ReceivedMessage.map((message,index)=>{
               if(message.UserName ===user){
                  return (
                   <div key={index}className="Chat_right">
                      <div className="Chat_Profile_right">
                        <img src={Profile} alt="display person avatar"/>
                        <p>{message.UserName}</p>
                      </div>
                   
                       <div className="Chat_message">
                          <p>{message.Message}</p>
                      </div>
                      
                   </div>)
                  }
               else{
                  return (
                    <div key={index} className="Chat_left">
                        <div className="Chat_Profile_left">
                        <img src={Profile} alt="display person avatar"/>
                        <p>{message.UserName}</p>
                        </div>
                 
                        <div className="Chat_message">
                            <p>{message.Message}</p>
                        </div>
                    
                    </div>)
               }
           })
          
          : null }

         
    </div>
  )
}