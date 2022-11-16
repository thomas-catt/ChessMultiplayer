// continue socketio
import { Button, Text } from 'react-native-paper';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Touchable, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextProvider } from '../scripts/AppContext'
import ChessPiece from '../components/ChessPiece'
import { connectSocketIO, onUsersCountReceive } from '../scripts/Socket'

export default function Home(props) {
    const [dragDisplacement, setDragDisplacement] = useState(0)
    const [piecesLocations, setPiecesLocations] = useState({
        whitePawn1: [11, 25],
        blackPawn1: [21, 25]
    })
    let previousDragCoordinates = false
    const [currentPressedPiece, setCurrentPressedPiece] = useState(false)
    
    const windowDimensions = Dimensions.get('window')
    
	const { appContext } = props.context
	onUsersCountReceive((newUsersCount) => {
		appContext.setUsersCount(newUsersCount)
	})

    const coordinatesPercentageConversion = ({coordinates, percentage}) => {
        if (coordinates) {
            return [
                (100*(coordinates[0]-chessBoardPadding)/(chessBoardSize+chessBoardPadding)),
                (100*(coordinates[1]-chessBoardShelf)/(chessBoardSize+chessBoardShelf)),
                // (100*coordinates[1]/windowDimensions.height)
            ]
        } else if (percentage) {
            return [
                (((percentage[0]*(chessBoardSize+chessBoardPadding))/100)+chessBoardPadding),
                (((percentage[1]*(chessBoardSize+chessBoardShelf))/100)+chessBoardShelf),
                // ((percentage[1]*windowDimensions.height)/100)
            ]
        }
    }
    

    const onChessPiecePressed = (pieceId) => {
        console.log("Piece Pressed: " + pieceId)
        setCurrentPressedPiece(pieceId)
    }
    
    const onChessPieceReleased = (pieceId) => {
        console.log("Piece Released: " + pieceId)
        setCurrentPressedPiece(false)
        previousDragCoordinates = false
    }

    const onChessPieceDragged = (event) => {
        const [x, y] = coordinatesPercentageConversion({coordinates: [event.nativeEvent.pageX, event.nativeEvent.pageY]})

        if (currentPressedPiece === false) {
            previousDragCoordinates = {x, y}
        }
        // console.log("Move " + currentPressedPiece + " to ", x, y)
        console.log("Converted XY(" + event.nativeEvent.pageX + ", " + event.nativeEvent.pageY + ") to %XY(" + x + ", " + y + ")")
        console.log("Converted %XY(" + x + ", " + y + ") to XY:", ...coordinatesPercentageConversion({percentage: [x, y]}))

        piecesLocations[currentPressedPiece] = [x, y]
        setPiecesLocations(piecesLocations)
    }
    
    
    const chessBoardShelf = 75
    const chessBoardPadding = 25
    let chessBoardSize = windowDimensions.width*0.9 
    if (chessBoardSize > windowDimensions.height - 375) chessBoardSize = windowDimensions.height - 375

    const theme = appContext.themes.current()

    return <ScrollView contentContainerStyle={{padding: 32, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <View style={{
            backgroundColor: theme.colors.elevation.level1,
            paddingVertical: chessBoardShelf,
            width: chessBoardSize+chessBoardPadding,
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            borderRadius: 10
        }}>
            {
                /*
                    Create a transparent dummy <Draggable> here and record draging axes from this Draggable.
                    Then from the axes, manually displace the currentPressedPiece by calculations from
                    the axes obtained from the dummy Draggable, such that the <Draggable> acts as a controller
                    stick for the selected piece to move.
                */
            }
            <ChessPiece id="whitePawn1" name="pawn" side="white" press={onChessPiecePressed} release={onChessPieceReleased} drag={onChessPieceDragged} position={coordinatesPercentageConversion({percentage: piecesLocations.whitePawn1})}/>
            <ChessPiece id="blackPawn1" name="pawn" side="black" press={onChessPiecePressed} release={onChessPieceReleased} drag={onChessPieceDragged} position={coordinatesPercentageConversion({percentage: piecesLocations.blackPawn1})}/>
            <Image source={require('../images/ChessBoard.png')} style={{
                width: chessBoardSize,
                height: chessBoardSize,
                borderRadius: 10,
                zIndex: -1,
            }} />
        </View>

    </ScrollView>
}