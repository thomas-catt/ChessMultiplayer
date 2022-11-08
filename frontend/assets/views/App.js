import { StatusBar } from 'expo-status-bar';
import { Appbar, BottomNavigation, Button, ProgressBar, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Home from '../views/Home'
import Messaging from '../views/Messaging'
import More from '../views/More'

import { connectSocketIO, onUsersCountReceive } from '../scripts/Socket'


export default function App(props) {
	const { appContext, AppContextProvider } = props.context

	const HomeContainer = () => <Home context={props.context} />
	const MessagingContainer = () => <Messaging context={props.context} />
	const MoreContainer = () => <More context={props.context} />
	
	const [index, setIndex] = useState(0);
	const [routes] = useState([
	  { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
	  { key: 'messaging', title: 'Messaging', focusedIcon: 'forum', unfocusedIcon: 'forum-outline'},
	  { key: 'more', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: HomeContainer,
		messaging: MessagingContainer,
		more: MoreContainer,
	})


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
	    
	onUsersCountReceive((newUsersCount) => {
		appContext.setUsersCount(newUsersCount)
	})

	return (
			<AppContextProvider>
				<SafeAreaView/>
				<Appbar.Header style={{marginTop: StatusBar.currentHeight}} dark={true}>
					<Appbar.Action icon="chess-queen" />
					<Appbar.Content title="ChessBoard" />
					{/* <Button type="text" icon={{connected: "check", fail: "warning", false: "power-plug"}[loading]} loading={loading == 'loading'} disabled={['loading', 'connected'].includes(loading)} onPress={() => { setLoading('ready'); }}>
						{{fail: "Failed to Connect. Tap to retry", false: "Disconnected. Tap to connect", loading: "Connecting...", connected: "Connected!"}[loading]}
					</Button> */}
					{
						{
							loading:<Button disabled={true}>Connecting...</Button>,
							connected:<><Button textColor={appContext.darkTheme ? "#80e27e" : "#087f23"} icon="account">{appContext.usersCount}</Button></>,
							fail:<>eror</>,
							false:<>not Connecting</>,
						}[loading]
					}

					<Appbar.Action icon="brightness-6" onPress={props.changeTheme} />
				</Appbar.Header>
				{
					loading == "loading" ? <ProgressBar indeterminate={true} style={{backgroundColor: appContext.themes.current().colors.background}} /> : <></>
				}
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