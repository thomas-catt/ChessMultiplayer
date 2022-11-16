const { useState } = require('react');
const { StyleSheet, Text, View, Pressable, Dimensions } = require('react-native');
const { Button, Avatar } = require('react-native-paper');
import Draggable from 'react-native-draggable';

export default function ChessPiece(props) {
    const windowDimensions = Dimensions.get('window')
    const [hovered, setHovered] = useState(false)
    const [pressed, setPressed] = useState(false)

    return (
    <Draggable
            x={props.position[0]}
            y={props.position[1]}
            z={10}
            onPressIn={() => {
                props.press(props.id)
                setPressed(true)
            }}
            onDragRelease={() => {
                props.release(props.id)
                setPressed(false)
            }}
            onDrag={(event) => {
                props.drag(event)
                event.preventDefault()
                return false
            }}
            style={{
                // position: "absolute",
                // top: props.position[1],
                // left: props.position[0],
                // zIndex: 10,
            }}
        >
        <Avatar.Icon
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            icon={"chess-"+props.name}
            color={{white: "#ffffff", black: "#000000"}[props.side]}
            style={{
                backgroundColor: pressed ? "#88888833" : (hovered ? "#88888811" : "#00000000"),
                borderWidth: 1,
                borderColor: pressed ? "#88888866" : "#00000000",
            }}
        />
    </Draggable>
    )
}
