import Draggable from 'react-native-draggable';

const { useState } = require('react');
const { Text, View, Dimensions } = require('react-native');
const { Avatar } = require('react-native-paper');
import { broadcastChessPieceDrag, onChessPieceDragReceived } from '../scripts/Socket'
import { getClientColor } from '../scripts/Constants'

let broadcastCooldownReady = true

export default function ChessPiece(props) {
    const windowDimensions = Dimensions.get('window')
    const [pressed, setPressed] = useState(false)
    const [broadcastReady, setBroadcastReady] = useState(true)
    const [held, setHeld] = useState(false)
    const [position, setPosition] = useState(props.position)
    const [clientId, setClientId] = useState(false)

    onChessPieceDragReceived(props.id, (piece) => {
        if (piece.clientId != props.clientId) {
            setClientId(piece.clientId)
            if (piece.phase == "release") {
                props.setPiecesLocations({...props.piecesLocations, [props.id]: props.coordinatesPercentageConversion({coordinates: position})})
                const receivedCoords = props.coordinatesPercentageConversion({percentage: piece.position})
                setPosition(receivedCoords)
                setHeld(false)
            } else if (piece.phase == "press") {
                setHeld(piece.clientName)
            } else {
                const receivedCoords = props.coordinatesPercentageConversion({percentage: piece.position})
                setPosition(receivedCoords)
                setHeld(piece.clientName)
            }
        }
    })

    const broadcastChessPieceInput = (event, phase) => {
        if (!broadcastReady) {
            if (phase !== "release") return
        }
        
        let positionToSend = props.convertToUsableDragInput(event)
        if (props.flipped) {
            positionToSend = props.getFlippedPercentages(positionToSend)
        }
        if (phase == "release") {
            props.setPiecesLocations({...props.piecesLocations, [props.id]: positionToSend})
        }

        broadcastChessPieceDrag({
            clientId: props.clientId,
            clientName: props.clientName,
            id: props.id,
            phase: phase,
            position: positionToSend
        })

        // setBroadcastReady(false)
        // setTimeout(() => {
        //     setBroadcastReady(true)
        // }, 20);
    }
    
    const onPieceDrag = (event) => {
        if (broadcastCooldownReady) {
            broadcastChessPieceInput(event, "drag")
            broadcastCooldownReady = false
            setTimeout(() => {
                broadcastCooldownReady = true
            }, 17)            
        }
    }

    
    const clientColor = getClientColor(held ? clientId : props.clientId)[props.darkTheme][0]
    const clientColorBg = getClientColor(held ? clientId : props.clientId)[props.darkTheme][1]
    
    return (
    <Draggable
            x={position[0]-(props.size/2)}
            y={position[1]-(props.size/2)}
            z={held || pressed ? 1000 : 0}
            onPressIn={(event) => {
                if (held) return
                // props.press(props.id)
                setPressed(true)
                broadcastChessPieceInput(event, "press")
            }}
            onPressOut={(event) => {
                // props.release(props.id)
                setPressed(false)
                broadcastChessPieceInput(event, "release")
            }}
            onDragRelease={(event) => {
                setPressed(false)
                broadcastChessPieceInput(event, "release")
            }}
            onDrag={(event) => {
                let [x, y] = props.coordinatesPercentageConversion({percentage: props.convertToUsableDragInput(event)})
                if (props.flipped) {
                    [x, y] = props.coordinatesPercentageConversion({percentage: props.getFlippedPercentages(props.convertToUsableDragInput(event))})
                }
                setPosition([x, y])
                onPieceDrag(event)
                if (!pressed) setPressed(true)
            }}
            disabled={held}
            style={{
                // position: "absolute",
                zIndex: held ? 1 : -1,
            }}
            >
        <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Avatar.Icon
                size={props.size}
                icon={"chess-"+props.name}
                color={{white: "#ffffff", black: "#000000"}[props.side]}
                style={{
                    backgroundColor: held ? clientColor+"cc" : (pressed ? clientColor+"cc" : "#00000000"),
                    transform: [{rotate: props.flipped ? '180deg' : '0deg'}],
                    borderWidth: 1,
                    borderRadius: 0,
                    borderColor: pressed ? clientColor : "#00000000",
                }}
            />
            {held ? <Text style={{fontSize: 12,
                paddingHorizontal: 6,
                paddingVertical: 2,
                marginHorizontal: 6,
                borderRadius: 100,
                transform: [{rotate: props.flipped ? '180deg' : '0deg'}],
                color: clientColor,
                backgroundColor: clientColorBg+"cc",
                borderColor: clientColor,
                borderWidth: 1,
                fontWeight: "bold",
                textAlign: "center"
            }} variant='labelMedium'>{held}</Text> : <></>}            
        </View>
    </Draggable>
    )
}
