import { StatusBar } from 'expo-status-bar';
import { Appbar, BottomNavigation, Button, ProgressBar, Snackbar, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Home from '../views/Home'
import Messaging from '../views/Messaging'
import More from '../views/More'

import { connectSocketIO, onTextMessageReceive, onUsersCountReceive } from '../scripts/Socket'


const UsersCounter = (props) => {
	const appContext = props.appContext
	const [usersCount, setUsersCount] = useState("Waiting...")
	onUsersCountReceive((newUsersCount) => {
		setUsersCount(newUsersCount)
	})

	return <Button textColor={appContext.darkTheme ? "#80e27e" : "#087f23"} icon="account">{usersCount}</Button>
}

const MessagesListener = (props) => {
	const appContext = props.appContext
	
    const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState("")
    
	onTextMessageReceive((m) => {
        const newMsg = {...m, sent: true, own: m.userId === appContext.clientId}
        appContext.messagesList = [newMsg, ...appContext.messagesList]
		appContext.update()
        setMessage(m.fullname+": " + m.message)
		setVisible(true)
    })

    return <Snackbar duration={2500} visible={visible} onDismiss={() => setVisible(false)} action={{label:"Dismiss"}}>
        {message}
    </Snackbar>
}

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
		// appContext.setSocket(socket)
	})

	if (loading == 'ready') setLoading("loading"); connectSocketIO({
		onConnect: () => setLoading('connected'),
		introduction: appContext.clientName,
		onFailure: () => setLoading('fail'),
		onDisconnect: () => setLoading('false')
	})
	    


    const theme = appContext.themes.current()

	return (
			<AppContextProvider>
				<SafeAreaView/>
				<Appbar.Header style={{marginTop: StatusBar.currentHeight}} dark={true}>
					<Appbar.Action icon="chess-queen" />
					<View>
						<View style={{display: 'flex', flexDirection: "column"}}>
							<Text variant='titleMedium'>ChessMultiplayer</Text>
							<View style={{flexDirection: "row"}}>
								<Text style={{color: "#88888888", fontSize: 12}}>Authenticated as </Text>
								<Text style={{fontSize: 12}}>{appContext.clientName}.</Text>
							</View>
						</View>
					</View>
					<Appbar.Content />
					{
						{
							loading:<Button></Button>,
							connected:<><UsersCounter appContext={appContext}/></>,
							fail:<>eror</>,
							false:<Button textColor={theme.colors.error}>Failed to connect, server offline.</Button>,
						}[loading]
					}

					<Appbar.Action icon="brightness-6" onPress={props.changeTheme} />
				</Appbar.Header>
				{
					((loading == "loading") || (appContext.piecesLocations === false)) ? <ProgressBar indeterminate={true} style={{backgroundColor: appContext.themes.current().colors.background}} /> : <></>
				}
				<BottomNavigation
					navigationState={{ index, routes }}
					onIndexChange={setIndex}
					renderScene={renderScene}
				/>
				{routes[index].key == "messaging" ? <></> : <MessagesListener appContext={appContext}/>}
			</AppContextProvider>
	);
}
