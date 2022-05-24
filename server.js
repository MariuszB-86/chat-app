const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (join) => {
    users.push(join);
    console.log('Add ' + join.name + ' to users');
    console.log(users);
    socket.broadcast.emit('newUser', {author: 'Chat Bot', content: join.name + ' has joined the conversation!'});
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left')
    
    const findUser = users.find(i => i.id === socket.id);
    const userIndex = users.indexOf(findUser);
  
    users.splice(userIndex, 1 );
    
    socket.broadcast.emit('removeUser', {author: 'Chat Bot', content: findUser.name + ' has left the conversation!'});
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});