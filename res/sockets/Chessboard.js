const { socketLog } = require("../commons")

let chessBoardLayout = {
    whitePawn1: [0, 0],
    blackPawn1: [50, 50],
    whiteKnight1: [100, 100],
}

// On: TEXT MESSAGE RECEIVE
// const MessageReceived = (socket, io) => {
//     socket.on('text-message', (messageObject) => {
//         EmitReceivedMessage(io, messageObject)
//     })
// }

// Emit: THE BOARD LAYOUT

const EmitBoardLayout = (io) => {
    // socketLog("Emitted board layout".blue)
    io.sockets.emit('chess-layout', chessBoardLayout)
}

module.exports = {
    EmitBoardLayout
}