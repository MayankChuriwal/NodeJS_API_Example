const { v4: uuid4 }  = require('uuid');

let users = [];

const getUsers = (req, res) => {
    res.send(users);
}

const addUser = (req, res) => {
    users.push( { ...req.body, id: uuid4() });
    res.redirect('/users');
}

const getUser = (req, res) => {
    for(let i=0;i<users.length;++i){
        if(users[i].id===req.params.id){
            res.send(`Hello from ${users[i].firstName} ${users[i].lastName}`);
            break;
        }
    }
    res.send('User not found');
}

const deleteUser = (req, res) => {
    users = users.filter((user) => user.id!==req.params.id);
    res.redirect('/users');
}

const updateUser = (req, res) => {
    const user = users.find((user) => user.id===req.params.id);
    if(req.body.firstName)
        user.firstName = req.body.firstName;
    if(req.body.lastName)
        user.lastName = req.body.lastName;
    if(req.body.age)
        user.age = req.body.age;
    res.redirect('/users');
}

module.exports = {getUsers, addUser, getUser, deleteUser, updateUser};