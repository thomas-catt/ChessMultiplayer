import { io } from 'socket.io-client';

let socket = false
const connectSocketIO = ({ onConnect, introduction, onFailure, onDisconnect }) => {
	if (!socket) {
        socket = io("http://192.168.1.7:4000/")
        socket.emit('introduction', introduction)
    }
	
	socket.on('connect', onConnect)
	socket.on('reconnect_failed', onFailure)
	socket.on('disconnect', onDisconnect)

}

const onUsersCountReceive = (callback) => {
	socket.on('connected-users', callback)
}

export {
    connectSocketIO,
    onUsersCountReceive
}