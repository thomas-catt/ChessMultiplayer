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
					<View>
						<View style={{display: 'flex', flexDirection: "column"}}>
							<Text variant='titleLarge'>ChessMultiplayer</Text>
							<View style={{flexDirection: "row"}}>
								<Text style={{color: "#88888888"}}>Authenticated as </Text>
								<Text>{appContext.clientName}.</Text>
							</View>
						</View>
					</View>
					<Appbar.Content />
					{
						{
							loading:<Button>Connecting...</Button>,
							connected:<><Button textColor={appContext.darkTheme ? "#80e27e" : "#087f23"} icon="account">{appContext.usersCount}</Button></>,
							fail:<>eror</>,
							false:<>Failed to connect, server offline.</>,
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
