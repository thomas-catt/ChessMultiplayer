const { socketLog } = require("../commons")

let chessBoardLayout = {
    whitePawn1: [1, 2],
    whitePawn2: [2, 2],
    whitePawn3: [3, 2],
    whitePawn4: [4, 2],
    whitePawn5: [5, 2],
    whitePawn6: [6, 2],
    whitePawn7: [7, 2],
    whitePawn8: [8, 2],
    whiteRook1: [1, 1],
    whiteRook2: [8, 1],
    whiteKnight1: [2, 1],
    whiteKnight2: [7, 1],
    whiteBishop1: [3, 1],
    whiteBishop2: [6, 1],
    whiteKing: [4, 1],
    whiteQueen1: [5, 1],
    whiteQueen2: [5, 0],
    whiteQueen3: [5, 0],
    whiteQueen4: [5, 0],
    whiteQueen5: [5, 0],
    whiteQueen6: [5, 0],
    whiteQueen7: [5, 0],
    whiteQueen8: [5, 0],
    whiteQueen9: [5, 0],
    blackPawn1: [1, 7],
    blackPawn2: [2, 7],
    blackPawn3: [3, 7],
    blackPawn4: [4, 7],
    blackPawn5: [5, 7],
    blackPawn6: [6, 7],
    blackPawn7: [7, 7],
    blackPawn8: [8, 7],
    blackRook1: [1, 8],
    blackRook2: [8, 8],
    blackKnight1: [2, 8],
    blackKnight2: [7, 8],
    blackBishop1: [3, 8],
    blackBishop2: [6, 8],
    blackKing: [4, 8],
    blackQueen1: [5, 8],
    blackQueen2: [5, 9],
    blackQueen3: [5, 9],
    blackQueen4: [5, 9],
    blackQueen5: [5, 9],
    blackQueen6: [5, 9],
    blackQueen7: [5, 9],
    blackQueen8: [5, 9],
    blackQueen9: [5, 9],
}

const gridIndexToPercentage = (pieceCoords) => {
    return [5 + pieceCoords[0]*10, 5 + pieceCoords[1]*10]
}

for (var pieceId in chessBoardLayout) {
    chessBoardLayout[pieceId] = gridIndexToPercentage(chessBoardLayout[pieceId])
}



// On: PIECE DRAG RECEIVE

const PieceDragReceived = (socket, io) => {
    Object.keys(chessBoardLayout).forEach(pieceId => {
        const listenerName = 'chess-'+pieceId+'-drag'
        socket.on(listenerName, (piece) => {
            if (piece.phase == "release") chessBoardLayout[piece.id] = piece.position
            
            EmitPieceDrag(io, listenerName, piece)
        })
    })
}

// Emit: THE BOARD LAYOUT

const EmitBoardLayout = (io) => {
    // socketLog("Emitted board layout".blue)
    io.sockets.emit('chess-layout', chessBoardLayout)
}

// Emit: THE RECEIVED PIECE DRAG

const EmitPieceDrag = (io, listenerName, piece) => {
    io.sockets.emit(listenerName, piece)
}

module.exports = {
    PieceDragReceived,
    EmitBoardLayout,
    EmitPieceDrag
}