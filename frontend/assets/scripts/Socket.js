import { io } from 'socket.io-client';
const socketUrl = "http://192.168.1.6:4000/"

let socket = false
let currentCallbacks = []
const connectSocketIO = ({ onConnect, introduction, onFailure, onDisconnect }) => {
    try {
        if (!socket) {
            socket = io(socketUrl)
            socket.emit('introduction', introduction)
        }
        
        socket.on('connect', onConnect)
        socket.on('reconnect_failed', onFailure)
        socket.on('disconnect', onDisconnect)

    } catch (err) {
        console.log(err)
        return onFailure()
    }
}

// Users.js:

const onUsersCountReceive = (callback) => {
    // if (currentCallbacks.includes('connected-users')) {
    //     socket.off('connected-users')
    //     currentCallbacks = currentCallbacks.filter(a => a.name != 'connected-users')  
    // }
    
    socket.on('connected-users', callback)
    currentCallbacks.push('connected-users')
}

// Messaging.js:

const broadcastTextMessage = (textMessage) => {
    socket.emit('text-message', textMessage)
}

const onTextMessageReceive = (callback) => {
    if (currentCallbacks.includes('text-message')) {
        socket.off('text-message')
        currentCallbacks = currentCallbacks.filter(a => a.name != 'text-message')  
    }    
    socket.on('text-message', callback)
    currentCallbacks.push('text-message')
}

// Chessboard.js:

const onChessLayoutReceive = (callback) => {
    if (currentCallbacks.includes('chess-layout')) return
    
    socket.on('chess-layout', callback)
    currentCallbacks.push('chess-layout')  
}

const onChessPieceDragReceived = (pieceId, callback) => {
    const listenerName = 'chess-'+pieceId+'-drag'
    if (currentCallbacks.includes(listenerName)) {
        socket.off(listenerName)
        currentCallbacks = currentCallbacks.filter(a => a.name != listenerName)  
    }
    
    socket.on(listenerName, callback)
    currentCallbacks.push(listenerName)  
}

const broadcastChessPieceDrag = (piece) => {
    socket.emit('chess-'+piece.id+'-drag', piece)
}
export {
    socket,
    connectSocketIO,
    onUsersCountReceive,
    broadcastTextMessage,
    onTextMessageReceive,
    onChessLayoutReceive,
    onChessPieceDragReceived,
    broadcastChessPieceDrag
}