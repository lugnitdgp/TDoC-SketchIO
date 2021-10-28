const users=[];
const addUser = (user)=>{
users.push(user);
}
// function getCurrentUser(id){
//     return users.find(user=>user.id===id);
// }
// function userLeave(id){

//     users.filter(user=>user.id===id);
// }
// function userCount(){
//     return users.length;
// }
module.exports={addUser};