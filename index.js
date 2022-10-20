// ENV, port, and colors lib for console beauty.
require('dotenv').config()
const expressPort = process.env.HTTP_PORT || 80
const ioPort = process.env.WS_PORT || 80
require('colors')
require('./res/sockets/io')

const express = require("express")
const app = express()
const http = require('http')
const server = http.createServer(app)


// Routes:
const getRoutes = require("./res/routes/Get.js")
const postRoutes = require("./res/routes/Post.js")

// Middleware:
const LoggingMiddleware = require("./res/middleware/LoggingMiddleware.js")

// Parse Request Body:
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Applying Resources:
app.use(LoggingMiddleware)

app.get('/', getRoutes.root)
app.post('/', postRoutes.root)

// Setup SocketIO:

const socketInit = require('./res/sockets/io')
socketInit(server)  



// // Start
// server.listen(expressPort, () => {
//     console.log(`              \n`.bgGreen.black.bold +
//                 `  Server up:  `.bgGreen.black.bold + " " + `http://localhost:${expressPort}\n`.cyan.underline +
//                 `              `.bgGreen.black.bold + "\n")
// })