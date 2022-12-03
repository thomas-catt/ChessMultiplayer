import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'

const clientId = uuidv4()
const clientIdShort = clientId.substring(0, 4).toUpperCase()

const piecesData = [
    {id: "Pawn1", side: "white", name: "pawn"},
    {id: "Pawn2", side: "white", name: "pawn"},
    {id: "Pawn3", side: "white", name: "pawn"},
    {id: "Pawn4", side: "white", name: "pawn"},
    {id: "Pawn5", side: "white", name: "pawn"},
    {id: "Pawn6", side: "white", name: "pawn"},
    {id: "Pawn7", side: "white", name: "pawn"},
    {id: "Pawn8", side: "white", name: "pawn"},
    {id: "Knight1", side: "white", name: "knight"},
    {id: "Knight2", side: "white", name: "knight"},
    {id: "Bishop1", side: "white", name: "bishop"},
    {id: "Bishop2", side: "white", name: "bishop"},
    {id: "Rook1", side: "white", name: "rook"},
    {id: "Rook2", side: "white", name: "rook"},
    {id: "King", side: "white", name: "king"},
    {id: "Queen1", side: "white", name: "queen"},
    {id: "Queen2", side: "white", name: "queen"},
    {id: "Queen3", side: "white", name: "queen"},
    {id: "Queen4", side: "white", name: "queen"},
    {id: "Queen5", side: "white", name: "queen"},
    {id: "Queen6", side: "white", name: "queen"},
    {id: "Queen7", side: "white", name: "queen"},
    {id: "Queen8", side: "white", name: "queen"},
    {id: "Queen9", side: "white", name: "queen"},
    {id: "Pawn1", side: "black", name: "pawn"},
    {id: "Pawn2", side: "black", name: "pawn"},
    {id: "Pawn3", side: "black", name: "pawn"},
    {id: "Pawn4", side: "black", name: "pawn"},
    {id: "Pawn5", side: "black", name: "pawn"},
    {id: "Pawn6", side: "black", name: "pawn"},
    {id: "Pawn7", side: "black", name: "pawn"},
    {id: "Pawn8", side: "black", name: "pawn"},
    {id: "Knight1", side: "black", name: "knight"},
    {id: "Knight2", side: "black", name: "knight"},
    {id: "Bishop1", side: "black", name: "bishop"},
    {id: "Bishop2", side: "black", name: "bishop"},
    {id: "Rook1", side: "black", name: "rook"},
    {id: "Rook2", side: "black", name: "rook"},
    {id: "King", side: "black", name: "king"},
    {id: "Queen1", side: "black", name: "queen"},
    {id: "Queen2", side: "black", name: "queen"},
    {id: "Queen3", side: "black", name: "queen"},
    {id: "Queen4", side: "black", name: "queen"},
    {id: "Queen5", side: "black", name: "queen"},
    {id: "Queen6", side: "black", name: "queen"},
    {id: "Queen7", side: "black", name: "queen"},
    {id: "Queen8", side: "black", name: "queen"},
    {id: "Queen9", side: "black", name: "queen"}
]

const clientAccentColors = [
    ["#ffff44", "#666600", "Yellow"],
    ["#ff9944", "#442200", "Orange"],
    ["#db760b", "#422a00", "Women ☕"],
    ["#ff6666", "#440000", "Red"],

    ["#ff44ff", "#440044", "Pink"],
    ["#9944ff", "#220044", "Purple"],
    ["#6666ff", "#000044", "Blue"],
    ["#44ffff", "#006666", "Cyan"],

    ["#44ff44", "#004400", "Green"],
]

let cachedClientColors = {}

const getClientColor = (id) => {
    if (!id) id = clientId

    if (cachedClientColors[id]) {
        // console.log('Found cached clientColor:', cachedClientColors[id])
        return cachedClientColors[id]
    }
    // let id = "c5c3739a-9097-43cc-820a-0eda42835001"
    let idNumbers = [...id].filter(a => !isNaN(parseInt(a))).map(a => parseInt(a))

    let idNumbersSum
    do {
        idNumbersSum = idNumbers.reduce((a, b) => a + b)
        idNumbers = [...(""+idNumbersSum)].map(a => parseInt(a))
        
    } while (idNumbersSum > 9)

    const colorToSend = clientAccentColors[idNumbersSum-1]
    cachedClientColors[id] = colorToSend
    return colorToSend
}

export {
    clientId,
    clientIdShort,
    piecesData,
    clientAccentColors,
    getClientColor
}