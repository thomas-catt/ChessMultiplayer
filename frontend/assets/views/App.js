import { StatusBar } from 'expo-status-bar';
import { Appbar, BottomNavigation, Button, Text, TouchableRipple } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';

import Home from './Home'
import More from './More'

import { io } from 'socket.io-client';

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


	const [loading, setLoading] = useState('loading')

	let socket

    const connectSocketIO = () => {
        console.log("Connecting...")
        socket = io(":4000")
        socket.on('connect', () => setLoading('connected'))
        socket.on('reconnect_failed', () => setLoading('fail'))
        console.log("Connected.")
    }

	if (loading == 'loading') connectSocketIO()

	return (<AppContextProvider>
		<Appbar dark={true}>
			<Appbar.Action icon="chess-queen" />
			<Appbar.Content title="Chess App" />
			<Button type="text" icon={{connected: "check", fail: "warning", false: "power-plug"}[loading]} loading={loading == 'loading'} disabled={['loading', 'connected'].includes(loading)} onPress={() => { setLoading('loading'); connectSocketIO() }}>
				{{fail: "Failed to Connect. Tap to retry", false: "Connect Socket", loading: "Connecting...", connected: "Connected!"}[loading]}
			</Button>
			<Appbar.Action icon="brightness-6" onPress={props.changeTheme} />
		</Appbar>
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>		
	</AppContextProvider>
	);
	<ScrollView
		style={{backgroundColor: 'black', flex: 1, padding: 32,}}
		contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
		<Home />
    </ScrollView>
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