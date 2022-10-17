module.exports = function (req, res, next) {
    const [ dateH, dateM, dateS ] = [ new Date().getHours(), new Date().getMinutes(), new Date().getSeconds() ]
    const reqMethodOutputColor = ({GET: "green", POST: "magenta"})[req.method] || "yellow"

    console.log(`HTTP`.bgWhite.black, `${dateH}:${dateM}:${dateS} `, `${req.method}`[reqMethodOutputColor].bold, ":", req.body);

    next()
}