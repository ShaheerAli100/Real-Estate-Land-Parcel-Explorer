const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// const { callbackify } = require('util');
const Filter = require('bad-words')
const {generatemessage} = require('./utils/messages')
const {generatelocationmsg} = require('./utils/messages')
const { 
    adduser,
    removeUser,
    getUser,
      getuserinroom} = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server)
const port = process.env.PORT || 3003
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
let count = 0
//server (emit) =>client (received) - update0d
//client (emit) => sever (received) - updated
io.on('connection', (socket) => {
    console.log("new web socket connection")
    ///////join code
    socket.on('join' , (options, callback) => {
        const {error, user } = adduser ({
            id: socket.id , ...options
        })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message',generatemessage('Admin','Welcome'))
        socket.broadcast.to(user.room).emit('message', generatemessage('Admin',`${user.username} has joined`))

        io.to(user.room).emit('roomData',{
            room: user.room,
            users: getuserinroom(user.room)
            
            
        })
        

    })

    socket.on('sendMessage', (message , callback) =>{
        const user = getUser(socket.id)
    
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback("profanity is not allowed")
        }
        io.to(user.room).emit('message',generatemessage(user.username, message))
        callback()
    })
    // socket.emit('CountedUpdate', count)
    // socket.on('increment', ()=> {
    //     count++
    //     // socket.emit('CountedUpdate', count)
    //     io.emit('CountedUpdate', count)
    // })
    //
    socket.on('sendlocation' , (coords, callback) => {
        const user = getUser(socket.id)
        io.emit( 'locationMessage' , generatelocationmsg(user.username,`http://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback ()

    })


    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', generatemessage('Admin',`${user.username} has left`))
            io.to(user.room).emit('roomData',{
                room:user.room,
                users: getuserinroom(user.room)
                
            })

        }

       
   })
    
})

server.listen(port, () =>{
    console.log(`server is runing on part ${port}`)
})


