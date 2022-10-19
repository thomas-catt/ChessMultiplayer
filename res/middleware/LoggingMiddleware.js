const { getFormattedTime } = require('../commons')

module.exports = function (req, res, next) {
    let [ dateH, dateM, dateS ] = [ new Date().getHours(), new Date().getMinutes(), new Date().getSeconds() ]    
    dateH, dateM, dateS =  dateH < 10 ? "0" + dateH : dateH, dateM < 10 ? "0" + dateM : dateM, dateS < 10 ? "0" + dateS : dateS 

    const reqMethodOutputColor = ({GET: "green", POST: "magenta"})[req.method] || "yellow"

    console.log(`HTTP `.bgWhite.black, getFormattedTime(), `${req.method}`[reqMethodOutputColor].bold, ":", req.body);

    next()
}