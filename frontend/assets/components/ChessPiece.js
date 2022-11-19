import Draggable from 'react-native-draggable';

const { useState } = require('react');
const { StyleSheet, Text, View, Pressable, Dimensions, ShadowPropTypesIOS } = require('react-native');
const { Button, Avatar } = require('react-native-paper');
import { broadcastChessPieceDrag, onChessPieceDragReceived } from '../scripts/Socket'

export default function ChessPiece(props) {
    const windowDimensions = Dimensions.get('window')
    const [pressed, setPressed] = useState(props.pressed)
    const [position, setPosition] = useState(props.position)

    onChessPieceDragReceived(props.id, (piece) => {
        if (piece.clientId != props.clientId) {
            const receivedCoords = props.coordinatesPercentageConversion({percentage: piece.position})
            // console.log(receivedCoords)
            setPosition(receivedCoords)
            props.setPiecesLocations({...props.piecesLocations, [props.id]: piece.position})
        }
    })

    const onPieceDrag = (event) => {
        broadcastChessPieceDrag({
            id: props.id,
            clientId: props.clientId,
            position: props.convertToUsableDragInput(event)
        })
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
            }}
            onDrag={(event) => {
                const [x, y] = props.coordinatesPercentageConversion({percentage: props.convertToUsableDragInput(event)})
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
                borderWidth: 1,
                borderRadius: 0,
                borderColor: pressed ? "#88888866" : "#00000000",
            }}
        />
    </Draggable>
    )
}
