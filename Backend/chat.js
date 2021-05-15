// user=[{name:user,id:"21"}]
const users = [];

const addUser = ({id,UserName,room})=>{

    const error = "User already exists";
    const userName = UserName.trim().toLowerCase();
    room = room.trim().toLowerCase();

    let userExist=false;
    users.forEach(user=>{
       if( (user.name === userName) || (user.id== id) ){
            userExist=true;
       }
   })

   const user = {userName,id,room};

   if(!userExist){
       users.push(user)
       return {user};
   }

   else return {error:erorr};
   
}

const getUser = (id)=>{
    
   return users.find(user=>user.id === id)
}


module.exports = {addUser,getUser};