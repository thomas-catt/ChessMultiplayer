function socketLog(...msg) {
    console.log("  WS".bgYellow.black, ...msg)
}

io.on('connection', () => {
    socketLog("a user connected")
})

