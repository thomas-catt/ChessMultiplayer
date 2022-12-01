import { Button, Snackbar, Text } from 'react-native-paper';
import { Platform, StatusBar } from 'react-native';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Touchable, View } from 'react-native';
import {  useState } from 'react';
import ChessPiece from '../components/ChessPiece'
import { onUsersCountReceive, onChessLayoutReceive, onTextMessageReceive } from '../scripts/Socket'
    
const windowDimensions = Dimensions.get('window')
const statusBarHeight = StatusBar.currentHeight

const convertToUsableDragInput = (event) => {
    return coordinatesPercentageConversion({coordinates: [
        event.nativeEvent.pageX-(windowDimensions.width-(chessBoardSize+chessBoardPadding*2))/2,
        event.nativeEvent.pageY-(windowDimensions.height-chessBoardSize)/2+chessBoardPadding
    ]})

}

let chessBoardSize = (windowDimensions.width)*0.9 
let chessBoardPadding = chessBoardSize/8
if (((chessBoardSize+(2*chessBoardPadding)) > windowDimensions.height - 375))
    chessBoardSize = windowDimensions.height - 375
if ((chessBoardSize+(2*chessBoardPadding)) > windowDimensions.width)
    chessBoardSize = windowDimensions.width-(2*chessBoardPadding)
chessBoardPadding = chessBoardSize/8

const coordinatesPercentageConversion = ({coordinates, percentage}) => {
    if (coordinates) {
        return [
            (coordinates[0]/(chessBoardSize+(chessBoardPadding*2)))*100,
            (coordinates[1]/(chessBoardSize+(chessBoardPadding*2)))*100,
        ]
    } else if (percentage) {
        return [
            ((percentage[0]/100)*(1.25))*chessBoardSize,
            ((percentage[1]/100)*(1.25))*chessBoardSize
        ]
    }
}

const getFlippedPercentages = (percentage) => {
    return [100-percentage[0], 100-percentage[1]]
}

const pieceSize = (chessBoardSize+2*chessBoardPadding)/10

let piecesLocations = false

const ChessPieces = (props) => {
    const { appContext } = props.context
    const setPiecesLoaded = props.setPiecesLoaded
    const constPiecesData = appContext.constPiecesData
    let [currentPressedPiece, setCurrentPressedPiece] = useState(false)
    // const [piecesLocations, setPiecesLocations] = useState(appContext.piecesLocations)

    // if (piecesLocations && (appContext.piecesLocations === false)) appContext.setPiecesLocations(piecesLocations)
    
    onChessLayoutReceive((chessLayout) => {
        // console.log("Chess layout received and current chess layout is: ", piecesLocations)
        if (piecesLocations === false) {
            // for (var pieceId in chessLayout) {
            //     chessLayout[pieceId] = gridIndexToPercentage(chessLayout[pieceId])
            // }
            setPiecesLoaded(true)
            piecesLocations = chessLayout
            appContext.setPiecesLocations(chessLayout)
        }
        
	})

    /*
    const onChessBoardPressed = (pieceId) => {
        console.log("Piece Pressed: ", pieceId)
        currentPressedPiece = pieceId
    }
    
    const onChessPieceReleased = () => {
        console.log("Piece Released: " + currentPressedPiece)
        setCurrentPressedPiece(false)
        appContext.piecesLocations = piecesLocations
    }

    const onChessPieceDragged = (event) => {
        const [x, y] = convertToUsableDragInput(event)

        setPiecesLocations({...piecesLocations, [currentPressedPiece]: [x, y]})
    }

    const onChessBoardDragged = (event) => {
        const [x, y] = convertToUsableDragInput(event)
        const pieceTouchingRange = 5
        let closestPiece = currentPressedPiece
        if (!currentPressedPiece) {
            closestPiece = 'none'

            for (var pieceId in piecesLocations) {
                const piece = piecesLocations[pieceId]

                if ((Math.abs(piece[0] - x) < pieceTouchingRange) && (Math.abs(piece[1] - y) < pieceTouchingRange)) {
                    // this piece is in touching range

                // check between closestPiece and piece, which one is closer
                // if (!closestPiece || (Math.abs(piece[0] - x)) )
                    closestPiece = pieceId
                    console.log("Piece Pressed: ", closestPiece)
                }
            }
        }
        
        // console.log("Closest to Cursor:", closestPiece)
        // if (closestPiece != 'none') {
            setPiecesLocations({...piecesLocations, [closestPiece]: [x, y]})
        // }
        
        setCurrentPressedPiece(closestPiece)
    }
    */
    
    return (
        <>
            {
                piecesLocations ? [...constPiecesData.map(pieceToRender => {
                    const id = pieceToRender.side + pieceToRender.id
                    let pieceCoords = coordinatesPercentageConversion({percentage: piecesLocations[id]})

                    if (Object.keys(piecesLocations).includes(id)) {
                        return <ChessPiece
                        key={id}
                        id={id}
                        clientId={appContext.clientId}
                        clientName={appContext.clientName}
                        name={pieceToRender.name}
                        side={pieceToRender.side}
                        z={-1}
                        size={pieceSize}
                        // press={onChessBoardPressed}
                        // release={onChessPieceReleased}
                        flipped={props.flipped}
                        getFlippedPercentages={getFlippedPercentages}
                        convertToUsableDragInput={convertToUsableDragInput}
                        coordinatesPercentageConversion={coordinatesPercentageConversion}
                        piecesLocations={piecesLocations}
                        setPiecesLocations={(v) => {
                            piecesLocations = v
                        }}                        
                        position={pieceCoords}/>
                    }

                }),
                // <Draggable
                //     key="chessBoardDraggable"
                //     // shouldReverse
                //     style={{position: "absolute", top: 0, left: 0, zIndex:100000}}
                //     onDrag={onChessBoardDragged}
                //     onPressIn={onChessBoardDragged}
                //     onPressOut={onChessPieceReleased}
                //     onDragRelease={onChessPieceReleased}>
                //     <View style={{
                //         width: chessBoardSize+(chessBoardPadding*2),
                //         height: chessBoardSize+(chessBoardPadding*2),
                //         backgroundColor: "#88888822",
                //     }}></View>
                // </Draggable>
                ] : <Text style={{opacity: 0.5, transform: [{rotate: props.flipped ? '180deg' : '0deg'}],}}>Please wait...</Text>
            }
            
        </>
    )
}

export default function Home(props) {
    const { appContext } = props.context
    const [piecesLoaded, setPiecesLoaded] = useState(false)

    const theme = appContext.themes.current()

    return <View style={{
        // position: "absolute",
        // top: 0,
        // left: 0,
        // width: windowDimensions.width,
        // height: windowDimensions.height*0.75,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // borderWidth: 1,
        // borderColor: "green"
    }}>
        {/* <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button mode='outlined' onPress={() => appContext.setBoardFlipped(!appContext.boardFlipped)} icon="flip-vertical">Flip Board</Button>
        </View> */}
        {<View style={{
            backgroundColor: theme.colors.elevation.level1,
            width: chessBoardSize+(chessBoardPadding*2),
            height: chessBoardSize+(chessBoardPadding*2),
            position: "absolute",
            top: (((windowDimensions.height/2)-56)-(chessBoardSize+(chessBoardPadding*2))/2)-Platform.select({android: statusBarHeight, default: 0}),
            left: (windowDimensions.width/2)-(chessBoardSize+(chessBoardPadding*2))/2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: [{rotate: appContext.boardFlipped ? '180deg' : '0deg'}],
            borderRadius: 10,
        }}>
            <Image source={require('../images/ChessBoard.png')} style={{
                width: chessBoardSize,
                height: chessBoardSize,
                borderRadius: 10,
                zIndex: -1,
            }} />
            <ChessPieces flipped={appContext.boardFlipped} context={{appContext}} setPiecesLoaded={setPiecesLoaded}/>
        </View>}
    </View>
}