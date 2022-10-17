const root = function (req, res) {
    res.status(200).send(`
        Hello, My friend.
    `)    
}

module.exports = {
    root
}