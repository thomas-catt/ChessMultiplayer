// DISPLACEMENT
import { Button, Text } from 'react-native-paper';
import { Platform, StatusBar } from 'react-native';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Touchable, View } from 'react-native';
import {  useState } from 'react';
import ChessPiece from '../components/ChessPiece'
import Draggable from 'react-native-draggable'
import { onUsersCountReceive, onChessLayoutReceive } from '../scripts/Socket'

export default function Home(props) {
    const { appContext } = props.context
    const [maxPieceZ, setMaxPieceZ] = useState(0)
    const constPiecesData = appContext.constPiecesData
    const [currentPressedPiece, setCurrentPressedPiece] = useState(false)
    const [piecesLocations, setPiecesLocations] = useState(appContext.piecesLocations)
    
    const windowDimensions = Dimensions.get('window')
    const statusBarHeight = StatusBar.currentHeight
    
	onUsersCountReceive((newUsersCount) => {
		appContext.setUsersCount(newUsersCount)
	})

    const gridIndexToPercentage = (pieceCoords) => {
        return [5 + pieceCoords[0]*10, 5 + pieceCoords[1]*10]
    }
    
    onChessLayoutReceive((chessLayout) => {
        console.log("Board layout received: ", piecesLocations)
        if (!piecesLocations) {
            for (var pieceId in chessLayout) {
                chessLayout[pieceId] = gridIndexToPercentage(chessLayout[pieceId])
            }
            setPiecesLocations(chessLayout)
            appContext.setPiecesLocations(chessLayout)
        }
        
	})

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

    const pieceSize = (chessBoardSize+2*chessBoardPadding)/10

    const onChessPieceReleased = () => {
        console.log("Piece Released: " + currentPressedPiece)
        setCurrentPressedPiece(false)
        appContext.piecesLocations = piecesLocations
    }

    const onChessBoardDragged = (event) => {
        const [x, y] = coordinatesPercentageConversion({coordinates: [
            event.nativeEvent.pageX-(windowDimensions.width-(chessBoardSize+chessBoardPadding*2))/2,
            event.nativeEvent.pageY-(windowDimensions.height-chessBoardSize)/2+chessBoardPadding
        ]})

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
        {piecesLocations ? <View style={{
            backgroundColor: theme.colors.elevation.level1,
            width: chessBoardSize+(chessBoardPadding*2),
            height: chessBoardSize+(chessBoardPadding*2),
            position: "absolute",
            top: (((windowDimensions.height/2)-56)-(chessBoardSize+(chessBoardPadding*2))/2)-Platform.select({android: statusBarHeight, default: 0}),
            left: (windowDimensions.width/2)-(chessBoardSize+(chessBoardPadding*2))/2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            borderRadius: 10,
        }}>
            {
                constPiecesData.map(pieceToRender => {
                    const id = pieceToRender.side + pieceToRender.id
                    let pieceCoords = coordinatesPercentageConversion({percentage: piecesLocations[id]})

                    if (Object.keys(piecesLocations).includes(id)) {
                        return <ChessPiece
                        key={id}
                        id={id}
                        name={pieceToRender.name}
                        side={pieceToRender.side}
                        z={maxPieceZ}
                        size={pieceSize}
                        pressed={currentPressedPiece == id}
                        position={pieceCoords.map(a => a-(pieceSize/2))}/>
                    }

                })
            }
            <Image source={require('../images/ChessBoard.png')} style={{
                width: chessBoardSize,
                height: chessBoardSize,
                borderRadius: 10,
                zIndex: -1,
            }} />
            <Draggable
                shouldReverse
                style={{position: "absolute", top: 0, left: 0, zIndex:100}}
                onDrag={onChessBoardDragged}
                onPressIn={onChessBoardDragged}
                onPressOut={onChessPieceReleased}
                onDragRelease={onChessPieceReleased}>
                <View style={{
                    width: chessBoardSize+(chessBoardPadding*2),
                    height: chessBoardSize+(chessBoardPadding*2),
                    backgroundColor: "#88888800",
                }}></View>
            </Draggable>
        </View> : <Text style={{opacity: 0.5}}>Please wait...</Text>}

    </View>
}