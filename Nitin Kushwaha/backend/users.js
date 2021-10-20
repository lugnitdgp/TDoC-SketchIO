const users = [];

const addUser = function(user){
    users.push(user);
}

const removeUser = function(userid){
    users.splice(users.findIndex((e)=>{
        e.id === userid;
    }), 1);
}

module.exports={
    addUser, users, removeUser
}