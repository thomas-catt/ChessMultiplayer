import { io } from 'socket.io-client';
const socketUrl = "http://192.168.1.69:4000/"

let socket = false
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
	socket.on('connected-users', callback)
}

const broadcastTextMessage = (textMessage) => {
    console.log("SENDING MESSAGE:", textMessage)
}

const onTextMessageReceive = (callback) => {
	socket.on('text-message', callback)
}



export {
    socket,
    connectSocketIO,
    onUsersCountReceive,
    broadcastTextMessage,
    onTextMessageReceive
}