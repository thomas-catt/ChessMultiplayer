const { socketLog } = require("../commons")

const chessBoardLayout = [
    // read notes.md
]

// On: TEXT MESSAGE RECEIVE
// const MessageReceived = (socket, io) => {
//     socket.on('text-message', (messageObject) => {
//         EmitReceivedMessage(io, messageObject)
//     })
// }

// Emit: THE BOARD LAYOUT

const EmitBoardLayout = (io, messageObject) => {
    socketLog(`${messageObject.fullname}: `.green.bold, messageObject.message.white)
    io.sockets.emit('text-message', messageObject)
}

module.exports = {
    EmitBoardLayout
}