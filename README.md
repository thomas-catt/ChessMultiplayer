# Chessable

 A multiplayer volatile raw chess board updating in real time.
 Uses React Native and SocketIO.

Basically the most _“Manual”_ online chess yet.

## Running the app:
The app runs with two instances. A server and a client.
- ### The Server:
The root folder is the server, clone this repo and do:

```bash
node index.js
```
- ### The Client:
The React Native frontend is located in `/frontend`. It's made with expo, so to build for Android or similar, refer to expo docs.

To run the app:

```bash
cd frontend
npm run web

# Or for Android:
npm run android
```

To make the client able to connect to the socket server, make sure to update the SocketIO IP address in `/frontend/assets/scripts/Socket.js`:

```javascript
import { io } from 'socket.io-client';
const socketUrl = "http://[SERVER-IP]:4000/"

...
```

## Contribution:
Please don't. This is my solo project, let me have my fun.