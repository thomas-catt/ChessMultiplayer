import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from 'react';
import { connectSocketIO, onUsersCountReceive } from '../scripts/Socket'

export default function Home(props) {
	const { appContext } = props.context

    return <View style={{padding: 32, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Text variant='displaySmall'>Hello World</Text>
        <Text style={{textAlign: "center"}}>You are <Text style={{fontWeight: "bold"}}>{appContext.clientName}</Text>.</Text>
        {/* {appContext.usersCount > -1 ? appContext.usersCount + " users online." : "Please wait while the app connects to the server..."}</Text> */}
    </View>
}