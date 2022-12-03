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
    
    onChessLayoutReceive((chessLayout) => {
        if (piecesLocations === false) {
            setPiecesLoaded(true)
            piecesLocations = chessLayout
            appContext.setPiecesLocations(chessLayout)
        }
        
	})
    
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
                ] : <Text style={{opacity: 0.5, transform: [{rotate: props.flipped ? '180deg' : '0deg'}],}}>Please wait...</Text>
            }
            
        </>
    )
}

export default function Home(props) {
    const { appContext } = props.context
    const [piecesLoaded, setPiecesLoaded] = useState(false)

    const theme = appContext.themes.current()

    return <>{appContext.socketReady ? <View style={{
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
            </View> : <Text style={{display: "flex", justifyContent: "center", alignItems: "center", height: windowDimensions.height}}>Connecting...</Text>}
            </>
}