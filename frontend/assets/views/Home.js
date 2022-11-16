// continue socketio
import { Button, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
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
        <View>
            <Image source={require('../images/ChessBoard.png')} style={{alignSelf: "stretch", height: 512}} />
        </View>

    </View>
}