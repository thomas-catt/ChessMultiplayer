import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextProvider } from '../scripts/AppContext'
import { connectSocketIO, onUsersCountReceive } from '../scripts/Socket'

export default function Home() {
    
	const appContext = useContext(AppContext)
	onUsersCountReceive((newUsersCount) => {
		appContext.setUsersCount(newUsersCount)
	})

    return <View style={{padding: 32, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Text variant='displaySmall'>Hello World</Text>
        <Text style={{textAlign: "center"}}>You are <Text style={{fontWeight: "bold"}}>{appContext.clientName}</Text>. {appContext.usersCount > -1 ? appContext.usersCount + " users online." : "Please wait while the app connects to the server..."}</Text>
    </View>
}