import React from 'react';
import './Chat.css';
import Profile from '../../../assets/Images/user.png'

export default function Chatbox({ReceivedMessage,user,history}){
    
    return(
     <div> 
        
        {history.length!==0?
          history.map((message,index)=>{
            if(message.UserName == user){
              return(<div key={index}className="Chat_right">
                        <div className="Chat_Profile_right">
                          <img src={Profile} alt="profile picture"/>
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
                    <img src={Profile} alt="profile picture"/>
                    <p>{message.UserName}</p>
                    </div>
             
                    <div className="Chat_message">
                        <p>{message.Message}</p>
                    </div>
                
                </div>)
            }
          }):null
        }

        {ReceivedMessage.length!==0?
           ReceivedMessage.map((message,index)=>{
               if(message.UserName ==user){
                  return (
                   <div key={index}className="Chat_right">
                      <div className="Chat_Profile_right">
                        <img src={Profile} alt="profile picture"/>
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
                        <img src={Profile} alt="profile picture"/>
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