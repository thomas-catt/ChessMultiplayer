import { io } from 'socket.io-client';
const socketUrl = "http://192.168.1.4:4000/"

let socket = false
let currentCallbacks = []
const connectSocketIO = ({ onConnect, introduction, onFailure, onDisconnect }) => {
	if (!socket) {
        socket = io(socketUrl)
        socket.emit('introduction', introduction)
    }
	
	socket.on('connect', onConnect)
	socket.on('reconnect_failed', onFailure)
	socket.on('disconnect', onDisconnect)

}

const onUsersCountReceive = (callback) => {
	if (currentCallbacks.includes('connected-users')) return
    
    socket.on('connected-users', callback)
    currentCallbacks.push('connected-users')
}

const broadcastTextMessage = (textMessage) => {
    socket.emit('text-message', textMessage)
}

const onTextMessageReceive = (callback) => {
	if (currentCallbacks.includes('text-message')) return
    
    socket.on('text-message', callback)
    currentCallbacks.push('text-message')
}



export {
    socket,
    connectSocketIO,
    onUsersCountReceive,
    broadcastTextMessage,
    onTextMessageReceive
}