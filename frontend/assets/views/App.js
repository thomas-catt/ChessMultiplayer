import { StatusBar } from 'expo-status-bar';
import { Appbar, BottomNavigation, Button, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Home from '../views/Home'
import More from '../views/More'

import { AppContext, AppContextProvider } from '../scripts/AppContext'
import { connectSocketIO } from '../scripts/Socket'

export default function App(props) {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
	  { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
	  { key: 'more', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
		more: More,
	})


	const appContext = useContext(AppContext)
	const [loading, setLoading] = useState('ready')

	let socket
	useEffect(() => {
		appContext.setSocket(socket)
	})

	if (loading == 'ready') setLoading("loading"); connectSocketIO({
		onConnect: () => setLoading('connected'),
		introduction: appContext.clientName,
		onFailure: () => setLoading('fail'),
		onDisconnect: () => setLoading('false')
	})

	return (
			<AppContextProvider>
				<SafeAreaView/>
				<Appbar.Header style={{marginTop: StatusBar.currentHeight}} dark={true}>
					<Appbar.Action icon="chess-queen" />
					<Appbar.Content title="ChessBoard" />
					<Button type="text" icon={{connected: "check", fail: "warning", false: "power-plug"}[loading]} loading={loading == 'loading'} disabled={['loading', 'connected'].includes(loading)} onPress={() => { setLoading('ready'); }}>
						{{fail: "Failed to Connect. Tap to retry", false: "Disconnected. Tap to connect", loading: "Connecting...", connected: "Connected!"}[loading]}
					</Button>
					<Appbar.Action icon="brightness-6" onPress={props.changeTheme} />
				</Appbar.Header>
				<BottomNavigation
					navigationState={{ index, routes }}
					onIndexChange={setIndex}
					renderScene={renderScene}
				/>
			</AppContextProvider>
	);
}

/*
module.exports = function () {
	return (
		<View style={styles.app}>
			<View style={styles.container}>
				<Text>Hello World!</Text>
				<Button text="Connect WS" />
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	app: {
		backgroundColor: 'black',
		color: 'white',
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});
*/