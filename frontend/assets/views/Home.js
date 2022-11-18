// continue socketio
import { Button, Text } from 'react-native-paper';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Touchable, View } from 'react-native';
import {  useState } from 'react';
import ChessPiece from '../components/ChessPiece'
import Draggable from 'react-native-draggable'
import { onUsersCountReceive, onChessLayoutReceive } from '../scripts/Socket'

export default function Home(props) {
    const [maxPieceZ, setMaxPieceZ] = useState(0)
    const constPiecesData = [
        {id: 'Pawn1', side: 'white', name: "pawn"},
        {id: 'Pawn1', side: 'black', name: "pawn"},
        {id: 'Knight1', side: 'white', name: "knight"},
    ]
    let previousDragCoordinates = false
    const [currentPressedPiece, setCurrentPressedPiece] = useState(false)
    
    const windowDimensions = Dimensions.get('window')
    
	const { appContext } = props.context
	onUsersCountReceive((newUsersCount) => {
		appContext.setUsersCount(newUsersCount)
	})

	onChessLayoutReceive((chessLayout) => {
        console.log("Chess layout received:", chessLayout)
		appContext.setPiecesLocations(chessLayout)
	})

    const chessBoardPadding = windowDimensions.height/20
    let chessBoardSize = windowDimensions.width*0.9 
    if (((chessBoardSize+(2*chessBoardPadding)) > windowDimensions.height - 375))
        chessBoardSize = windowDimensions.height - 375
    if ((chessBoardSize+(2*chessBoardPadding)) > windowDimensions.width)
        chessBoardSize = windowDimensions.width-(2*chessBoardPadding)
    
    const chessAreaOuterPaddingX = windowDimensions.width - (chessBoardSize+chessBoardPadding)
    const chessAreaOuterPaddingY = windowDimensions.height - (chessBoardSize+chessBoardPadding)

    const coordinatesPercentageConversion = ({coordinates, percentage}) => {
        if (coordinates) {
            return [
                (100*(coordinates[0]-chessAreaOuterPaddingX)/(chessBoardSize+chessBoardPadding))*2,
                (100*(coordinates[1]-chessAreaOuterPaddingY)/(chessBoardSize+chessBoardPadding))*2,
                // (100*coordinates[1]/windowDimensions.height)
            ]
        } else if (percentage) {
            return [
                (((percentage[0]*(chessBoardSize+chessBoardPadding))/100)+chessAreaOuterPaddingX),
                (((percentage[1]*(chessBoardSize+chessBoardPadding))/100)+chessAreaOuterPaddingY),
                // ((percentage[1]*windowDimensions.height)/100)
            ]
        }
    }

    const coordinatesPercentageConversion2 = ({coordinates, percentage}) => {
        if (coordinates) {
            return [
                (coordinates[0]/(chessBoardSize+(chessBoardPadding*2)))*100,
                (coordinates[1]/(chessBoardSize+(chessBoardPadding*2)))*100,
            ]
        } else if (percentage) {
            return [
                (percentage[0]/100)*chessBoardSize+(chessBoardPadding*2),
                (percentage[1]/100)*chessBoardSize+(chessBoardPadding*2)
            ]
        }
    }
    

    const onChessPieceReleased = () => {
        console.log("Piece Released: " + currentPressedPiece)
        setCurrentPressedPiece(false)
        previousDragCoordinates = false
    }

    const onChessBoardDragged = (event) => {
        const [x, y] = [event.nativeEvent.pageX, event.nativeEvent.pageY]
        console.log("Drag Input: ", `x: ${x}`, `y: ${y}`)

        if (!currentPressedPiece) {
            previousDragCoordinates = {x, y}
        }

        // console.log("Move " + currentPressedPiece + " to ", x, y)

        const pieceTouchingRange = 7.5
        let closestPiece = 'none'
        Object.keys(appContext.piecesLocations).forEach(pieceId => {
            const piece = appContext.piecesLocations[pieceId]
            if ((Math.abs(piece[0] - x) < pieceTouchingRange) && (Math.abs(piece[1] - y) < pieceTouchingRange)) {
                // this piece is in touching range

                // check between closestPiece and piece, which one is closer
                // if (!closestPiece || (Math.abs(piece[0] - x)) )
                    closestPiece = pieceId
            }
        })
        
        // console.log("Closest to Cursor:", closestPiece)
        if (currentPressedPiece == false || true) {
            console.log("Piece Pressed: " + closestPiece)
            setCurrentPressedPiece(closestPiece)
        }


        // appContext.piecesLocations[currentPressedPiece] = [x, y]
        // appContext.setPiecesLocations(appContext.piecesLocations)
    }
    
    
    const theme = appContext.themes.current()

    return <ScrollView contentContainerStyle={{padding: 32, display: "flex", justifyContent: "center", alignItems: "center"}}>
        {appContext.piecesLocations ? <View style={{
            backgroundColor: theme.colors.elevation.level1,
            padding: chessBoardPadding,
            width: chessBoardSize+(chessBoardPadding*2),
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            borderRadius: 10,
        }}>
            {
                constPiecesData.map(pieceToRender => {
                    const id = pieceToRender.side + pieceToRender.id
                    return <ChessPiece
                        key={id}
                        id={id}
                        name={pieceToRender.name}
                        side={pieceToRender.side}
                        z={maxPieceZ}
                        pressed={currentPressedPiece == id}
                        position={coordinatesPercentageConversion2({percentage: appContext.piecesLocations[id]})}/>

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
                onDragRelease={onChessPieceReleased}
                onPressOut={onChessPieceReleased}>
                <View style={{
                    width: chessBoardSize+(chessBoardPadding*2),
                    height: chessBoardSize+(chessBoardPadding*2),
                    backgroundColor: "#88888800",
                }}></View>
            </Draggable>
        </View> : <Text style={{opacity: 0.5}}>Please wait...</Text>}

    </ScrollView>
}