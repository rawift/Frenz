const io = require('socket.io')(8080, {
    cors :{
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {

    socket.emit("me", socket.id)
    socket.on('disconnect', ()=>{
        socket.broadcast.emit("callended")
    })
    socket.on("callUser", ({userToCall, signalData, from, name}) => {
        console.log(from,name)
        io.to(userToCall).emit("callUser",{signal:signalData, from, name})
    })

    socket.on("answerCall", (data) => {
        console.log("oy yeah",data.to)
        io.to(data.to).emit("callAccepted", data.signal)
    })

})