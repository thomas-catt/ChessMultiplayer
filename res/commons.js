function getFormattedTime() {
    let currentDate = new Date()

    let [ dateH, dateM, dateS ] = [ currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds() ]    
    dateH = dateH < 10 ? "0" + dateH : dateH
    dateM = dateM < 10 ? "0" + dateM : dateM
    dateS = dateS < 10 ? "0" + dateS : dateS 

    return `${dateH}:${dateM}:${dateS} `
}

function socketLog(...msg) {
    console.log("WS   ".bgYellow.black, getFormattedTime(), ...msg)
}

module.exports = {
    getFormattedTime,
    socketLog
}