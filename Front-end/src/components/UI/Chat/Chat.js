import React,{useState,useEffect,useRef} from 'react';
import queryString from 'query-string';
import Url from '../../../ApiServices/BackendUrl';
import io from "socket.io-client";
import Layout from '../../Layout/Layout';
import Chatbox from './Chatbox';
import './Chat.css';

let socket;
const user = localStorage.getItem('userName');

export default function Chat({location}){

    const [UserName, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage]=useState('');
    const [ReceivedMessage,setReceivedMessage] = useState([]);
    const [history,setHistory]=useState([]);

    const messageEndRef = useRef(null)

    const scrollToButtom = ()=>{
      messageEndRef.current.scrollIntoView({behavior:"smooth"}) 
    }

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
            console.log('here is the message',message);
            setReceivedMessage(message=>[...message,messages])
        })

        socket.on('history',messages=>{
          console.log(messages);
          setHistory(messages);
        })
        socket.on('admin',message=>{
          console.log(message)
        })
     },[]) 

     useEffect(()=>{
       scrollToButtom()
     },[message]);


     const sendMessage=()=>{

      if(message){
         socket.emit('sendMessage',{UserName,room,message}, ()=>{
            setMessage('')
            console.log(message)
         })
        }

     }
      
     console.log(message)

    return(<Layout>
                 
                  <Chatbox history={history} ReceivedMessage={ReceivedMessage} user={user}/>
                  <div className="Chat_input"> 
                    <input
                      ref={messageEndRef}
                      placeholder="Enter your message" 
                      value={message}
                      onKeyPress={event => event.key === 'Enter' ? sendMessage() : null}
                      onChange={(e)=>{setMessage(e.target.value)}} />
                    <button onClick={sendMessage}>send</button>
                  </div>
           </Layout>);
}