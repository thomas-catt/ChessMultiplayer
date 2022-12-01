# Chessable
_Formerly known as ChessMultiplayer._

~~Practicing socketio and express I guess.~~ ReactNative + SocketIO app creating a multiplayer raw chess board updating real time.

Basically the most _“Manual”_ online chess yet.

## Running the app:
The app runs with two instances. A server and a client.
- ### The Server:
The root folder is the frontend, clone this repo and do:

```bash
node index.js
```
- ### The Client:
The React Native project is located in `frontend/`:

```bash
cd frontend
npm run web

# Or for Android:
npm run android
```

To make the client be able to connect to the server, make sure to update the SocketIO IP address in `assets/scripts/Socket.js`:

```javascript
import { io } from 'socket.io-client';
const socketUrl = "http://[SERVER IP]:4000/"

...
```

## Contribution:
Please don't. This is my solo project, let me have my fun.