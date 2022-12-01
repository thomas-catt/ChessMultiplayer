import { Avatar, List, Switch, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

const SettingTile = (props) => {
    return <List.Item
        {...props} left={() => <List.Icon icon={props.icon}/>}
    />
}

export default function More(props) {
    const { appContext } = props.context

    return <View style={{padding: 32}}>
        <Text variant='displaySmall' style={{marginTop: 70, marginBottom: 30}}>Settings</Text>
        <SettingTile title="Flip Board" description={"Flip the Chess Board direction vertically"} icon="flip-vertical" right={(props) => <Switch style={{margin: 20}} value={appContext.boardFlipped} onValueChange={appContext.setBoardFlipped} />}/>
        <SettingTile title="Change username" description={"Change your username here. This will reconnect you to the game."} onPress={() => console.log("Dummy Button")} icon="open-in-new"/>
        <View style={{marginTop: 100, opacity: 0.5, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Avatar.Icon icon="chess-queen" style={{backgroundColor: "#00000000"}} color={"#ffffff"} size={48}/>
            <Text variant="headlineSmall">Chessable</Text>
            <Text>By ThomasCatt</Text>
        </View>
    </View>
}