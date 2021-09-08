import React,{useState,useEffect,useRef} from 'react';
import queryString from 'query-string';
import Url from '../../ApiServices/BackendUrl';
import io from "socket.io-client";
import Layout from '../../components/Layout/Layout';
import Chatbox from './Chatbox';
import InfoBar from './InfoBar';
import './Chat.css';

let socket;
const user = localStorage.getItem('userName');

export default function Chat({location}){

    const [UserName, setName] = useState('');
    const [Course,setCourse]=useState('')
    const [room, setRoom] = useState('');
    const [userId, setUserId] = useState(null);
    const [users,setUsers]=useState([]);
    const [message,setMessage]=useState('');
    const [ReceivedMessage,setReceivedMessage] = useState([]);
    const [history,setHistory]=useState([]);
    const [adminMessage,setAdminMessage] =useState(null);

    // pointing to input node
    const messageEndRef = useRef(null)

    const scrollToButtom = ()=>{
      messageEndRef.current.scrollIntoView({behavior:"smooth"}) 
    }

    useEffect(() => {
       
        const { UserName,CourseName, room,userId } = queryString.parse(location.search);
    
        socket = io(Url,{transports:['websocket']});
        scrollToButtom()
        setRoom(room)
        setName(UserName)
        setCourse(CourseName)
        setUserId(userId)
    
        socket.emit('join', { room,UserName,userId }, (error)=> {

        console.log('join signal sent')
          if(error) {
            alert(error);
          }
          
        });
      }, [Url]);

     
     useEffect(()=>{
        socket.on('Received_message',messages=>{
    
            setReceivedMessage(message=>[...message,messages])
        })

        socket.on('history',History=>{
          console.log(History)
          setHistory(History.History);
        
          setUsers(History.users)
        
        })
        socket.on('admin',message=>{
          console.log("admin info",message)
          setAdminMessage(message)
          // const newUsers = [...users];
          // console.log(message,users)
          // if(message.newUser){
          //   newUsers.push(message.UserName);
          // }
          setUsers(message.users);
        })

        
     },[]) 

     useEffect(()=>{
       scrollToButtom()
     },[message]);


     const sendMessage=()=>{

      if(message){
         socket.emit('sendMessage',{UserName,room,userId,message}, ()=>{
            setMessage('')
         })
        }

     }

    return(<Layout>
                  <InfoBar users={users} CourseName={Course}/>
                  <Chatbox admin={adminMessage} history={history} ReceivedMessage={ReceivedMessage} user={user}/>
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