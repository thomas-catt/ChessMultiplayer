const root = function (req, res) {
    res.status(200).send(`
        Hello, My friend in a POST request:
    `)
}

module.exports = {
    root
}