import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import Url from '../../../ApiServices/BackendUrl';
import io from "socket.io-client";
import Layout from '../../Layout/Layout';

let socket;
const user = localStorage.getItem('userName');

export default function Chat({location}){

    const [Username, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage]=useState(null);
    const [ReceivedMessage,setReceivedMessage] = useState([]);

    useEffect(() => {
       
        const { UserName,Teachername, room } = queryString.parse(location.search);
    
        socket = io(Url,{transports:['websocket']});
    
        setRoom(room)
        setName(UserName)
    
        socket.emit('join', { room,UserName }, (error)=> {

        console.log('join signal sent')
          if(error) {
            alert(error);
          }
          
        });
      }, [Url]);

     
     useEffect(()=>{
        socket.on('Received_message',messages=>{
            console.log('here is the message from admin',message);
            setReceivedMessage(message=>[...message,messages])
        })

       
     },[message]) 

     const sendMessage=()=>{
         socket.emit('sendMessage',{message}, ()=>{
            setMessage(null)
         })
     }
      
     console.log(ReceivedMessage)

    return(<Layout>
                 
                  <div> 
                      {ReceivedMessage.length!==0?
                         ReceivedMessage.map(message=>{
                             if(message.user ==user){
                                return (  <div>
                                    <p>{message.text}</p>
                                    <h3> {message.user}</h3>
                                 </div>)
                                }
                             else{
                                return (<div>
                                <p>{message.text}</p>
                                    <h3> {message.user}</h3>
                               </div>)
                             }
                         })
                        
                        : null }
                       
                  </div>


                  <input onChange={(e)=>{setMessage(e.target.value)}} />
                  <button onClick={sendMessage}>send</button>
           </Layout>);
}