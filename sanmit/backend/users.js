const users = []

const addUser = (user) =>  {
    users.push(user);
    printUsers();
}
const printUsers = () => {
    console.log("Current users in the server");
    users.map((user) => {
        console.log(user);
    })
}

module.exports = {
    addUser
}