import Draggable from 'react-native-draggable';

const { useState } = require('react');
const { StyleSheet, Text, View, Pressable, Dimensions, ShadowPropTypesIOS } = require('react-native');
const { Button, Avatar } = require('react-native-paper');
import { broadcastChessPieceDrag, onChessPieceDragReceived } from '../scripts/Socket'

let broadcastCooldownReady = true

export default function ChessPiece(props) {
    const windowDimensions = Dimensions.get('window')
    const [pressed, setPressed] = useState(false)
    const [position, setPosition] = useState(props.position)

    onChessPieceDragReceived(props.id, (piece) => {
        if (piece.clientId != props.clientId) {
            if (piece.phase == "release") {
                props.setPiecesLocations({...props.piecesLocations, [props.id]: props.coordinatesPercentageConversion({coordinates: position})})
            } else {
                const receivedCoords = props.coordinatesPercentageConversion({percentage: piece.position})
                setPosition(receivedCoords)                
            }

        }
    })

    const broadcastChessPieceInput = (event, phase) => {
        let positionToSend = props.convertToUsableDragInput(event)
        if (props.flipped) {
            positionToSend = props.getFlippedPercentages(positionToSend)
        }
        if (phase == "release") {
            props.setPiecesLocations({...props.piecesLocations, [props.id]: positionToSend})
        }

        broadcastChessPieceDrag({
            clientId: props.clientId,
            id: props.id,
            phase: phase,
            position: positionToSend
        })
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

    return (
    <Draggable
            x={position[0]-(props.size/2)}
            y={position[1]-(props.size/2)}
            onPressIn={() => {
                // props.press(props.id)
                setPressed(true)
            }}
            onPressOut={() => {
                // props.release(props.id)
                setPressed(false)
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
            style={{
                // position: "absolute",
                zIndex: props.z,
            }}
        >
        <Avatar.Icon
            size={props.size}
            icon={"chess-"+props.name}
            color={{white: "#ffffff", black: "#000000"}[props.side]}
            style={{
                // backgroundColor: "#"+((""+Math.round(position[0]*100))+(""+Math.round(position[1]*100))).substring(0, 6),
                backgroundColor: pressed ? "#88888833" : "#00000000",
                transform: [{rotate: props.flipped ? '180deg' : '0deg'}],
                borderWidth: 1,
                borderRadius: 0,
                borderColor: pressed ? "#88888866" : "#00000000",
            }}
        />
    </Draggable>
    )
}
