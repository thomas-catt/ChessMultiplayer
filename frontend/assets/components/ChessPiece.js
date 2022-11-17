const { useState } = require('react');
const { StyleSheet, Text, View, Pressable, Dimensions } = require('react-native');
const { Button, Avatar } = require('react-native-paper');

export default function ChessPiece(props) {
    const windowDimensions = Dimensions.get('window')
    const [pressed, setPressed] = useState(props.pressed)

    return (
    <View
            onPressIn={() => {
                props.press(props.id)
                setPressed(true)
            }}
            onPressOut={() => {
                props.release(props.id)
                setPressed(false)
            }}
            style={{
                position: "absolute",
                top: props.position[1]*(5/10),
                left: props.position[0]*(5/10),
                zIndex: props.z,
            }}
        >
        <Avatar.Icon
            size={(windowDimensions.height+windowDimensions.width)/20}
            icon={"chess-"+props.name}
            color={{white: "#ffffff", black: "#000000"}[props.side]}
            style={{
                backgroundColor: props.pressed ? "#88888833" : "#00000000",
                borderWidth: 1,
                borderColor: props.pressed ? "#88888866" : "#00000000",
            }}
        />
    </View>
    )
}
