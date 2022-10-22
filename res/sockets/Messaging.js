const { socketLog } = require("../commons")

// On: TEXT MESSAGE RECEIVE
const MessageReceived = (socket, io) => {
    socket.on('text-message', (messageObject) => {
        EmitReceivedMessage(io, messageObject)
    })
}

// Emit: THE RECEIVED MESSAGE

const EmitReceivedMessage = (io, messageObject) => {
    socketLog(`${messageObject.fullname}: `.green.bold, messageObject.message.white)
    io.sockets.emit('text-message', messageObject)
}

module.exports = {
    MessageReceived,
    EmitReceivedMessage
}