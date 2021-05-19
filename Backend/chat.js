// user=[{name:user,id:"21"}]

// rooms= [{roomId:"###",conversations:[{userName:"&&&",text:"&&", ...  }]}]

const rooms= [];

const addRoom = ({UserName,room})=>{

    const error = "User already exists";
    const userName = UserName.trim().toLowerCase();
    room = room.trim().toLowerCase();

    let roomExist=false;

    rooms.forEach(room=>{
        if(room.roomId === room){
            roomExist=true;
        }
    })

    const Singleroom = {roomId:room,convo:[]}

   if(!roomExist){
       rooms.push(Singleroom)
       return {Singleroom};
   }

   else return {error:erorr};
   
}

const getUser = (id)=>{
   return users.find(user=>user.id === id)
}

const removeUser = (id)=>{
    
}


module.exports = {addRoom,getUser,removeUser};