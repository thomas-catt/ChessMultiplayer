const { useState } = require('react');
const { StyleSheet, Text, View, Pressable } = require('react-native')
const styles = StyleSheet.create({
    button: {
      backgroundColor: "#498de5",
      padding: 8,
      borderRadius: 4,
      cursor: "pointer"
    },
    buttonText: {
        color: "white",
        fontWeight: "300",
        letterSpacing: 5,
        textTransform: "uppercase",
        userSelect: "none"
    }
});
  
const Button = function (props) {
    const [isPressed, setIsPressed] = useState(false);

    return <Pressable style={{...styles.button, opacity: isPressed ? 0.7 : 1}} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)}>
        <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
}

module.exports = {
    Button
}