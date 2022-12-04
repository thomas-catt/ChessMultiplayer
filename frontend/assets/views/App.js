import { StatusBar } from 'expo-status-bar';
import { Appbar, BottomNavigation, Button, Dialog, Portal, ProgressBar, Provider, Snackbar, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { getClientColor } from '../scripts/Constants';
import Home from '../views/Home'
import Messaging from '../views/Messaging'
import More from '../views/More'

import { connectSocketIO, onTextMessageReceive, onUsersCountReceive } from '../scripts/Socket'


const UsersCounter = (props) => {
	const appContext = props.appContext
	const [usersCount, setUsersCount] = useState("Waiting...")

	onUsersCountReceive(({users, name}) => {
		setUsersCount(users)
	})

	return <Button textColor={appContext.darkTheme ? "#80e27e" : "#087f23"} icon="account">{usersCount}</Button>
}

const NewUserListener = (props) => {
	const [newUserSnackbar, setNewUserSnackbar] = useState(false)
	onUsersCountReceive(({users, name}) => {
		if (name != props.appContext.clientName) setNewUserSnackbar(name)
	})

    return <Snackbar duration={2500} visible={newUserSnackbar} onDismiss={() => setNewUserSnackbar(false)} action={{label:"Dismiss"}}>
		{!newUserSnackbar ? "" : (newUserSnackbar !== '0' ? `"${newUserSnackbar}" has joined!` : "A user disconnected :(")}
    </Snackbar>
}

const MessagesListener = (props) => {
	const appContext = props.appContext
	
    const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState("")
    
	onTextMessageReceive((m) => {
        const newMsg = {...m, sent: true, own: m.userId === appContext.clientId}
        appContext.messagesList = [newMsg, ...appContext.messagesList]
		if (appContext.notifyMessages) {
			appContext.update()
			setMessage(m.clientName+": " + m.message)
			setVisible(true)
		}
    })

    return <Snackbar duration={2500} visible={visible} onDismiss={() => setVisible(false)} action={{label:"Dismiss"}}>
        {message}
    </Snackbar>
}

const ClientNameDialog = (props) => {
	const appContext = props.appContext
	const [clientNameInput, setClientNameInput] = useState("")
	const [error, setError] = useState("")

	const dismissClientNameInputDialog = () => {
		if (props.firstTime) {
			if (clientNameInput.trim() == "") return setError("Not so fast man, enter a name first.")
			else if (clientNameInput.trim().length < 4) return setError("Too small. Get it to 4 characters or more.")
			else if (clientNameInput.trim().length > 50) return setError("You're just testing my app now.")
			else if (clientNameInput.trim().length > 25) return setError("Oh boi that's a big biggie big name you got there, shrink it down somehow.")
		} else {
			if (clientNameInput.trim() == "") return setError("What are you even here for?")
			else if (clientNameInput.trim().length < 4) return setError("Too small. Get it to 4 characters or more.")
			else if (clientNameInput.trim().length > 25) return setError("Too small. Get it to 25 characters or less.")
		}

		appContext.setClientName(clientNameInput.trim())
		appContext.setShowUpdateUsernameDialog(false)
		if (props.firstTime) props.confirm()
		// setClientNameInput(appContext.clientName)
		setError("")
	}
	
    const theme = appContext.themes.current()
	return (
		<Dialog dismissable={!props.firstTime} visible={appContext.showUpdateUsernameDialog} onDismiss={() => appContext.setShowUpdateUsernameDialog(false)}>
			<Dialog.Title>{props.firstTime ? "✨Welcome to Chessable!✨" : "Choose a name"}</Dialog.Title>
			<Dialog.Content>
				<Text variant='bodyLarge'>{props.firstTime ? "This app doesn't need any tiring login setup, just put your name here and get going! :D" : "Enter new name below:"}</Text>
				<TextInput style={{marginVertical: 15}} mode='outlined' value={clientNameInput} label={props.firstTime ? "Choose a cool name" : "Enter name"} onChangeText={setClientNameInput} onSubmitEditing={dismissClientNameInputDialog}/>
				<Text style={{opacity: error == "" ? 0.5 : 1, color: error == "" ? undefined : theme.colors.error}}>{error == "" ? "Keep it atleast 4 characters long." : error}</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Button mode={props.firstTime ? "contained" : undefined} onPress={dismissClientNameInputDialog}>{props.firstTime ? "✨Hop In✨" : "Save"}</Button>
			</Dialog.Actions>
		</Dialog>
	)
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


	const [loading, setLoading] = useState(appContext.showUpdateUsernameDialog ? 'fail' : 'ready')

	if (loading == 'ready') {
		setLoading("loading")
		connectSocketIO({
			onConnect: () => {
				setLoading('connected')
				appContext.setSocketReady(true)
			},
			introduction: appContext.clientName,
			onFailure: () => setLoading('fail'),
			onDisconnect: () => setLoading('false')
		})
	}

	if (loading == 'connected') {
	}
	    


    const theme = appContext.themes.current()

	return (
			<AppContextProvider>
				<SafeAreaView/>
				<Appbar.Header style={{marginTop: StatusBar.currentHeight}} dark={true}>
					<Appbar.Action icon="chess-queen" />
					<View>
						<View style={{display: 'flex', flexDirection: "column"}}>
							<Text variant='titleMedium'>{appContext.metadata.name}</Text>
							{loading == "connected" && <View style={{flexDirection: "row"}}>
								<Text style={{color: "#88888888", fontSize: 12}}>Authenticated as </Text>
								<Text style={{color: getClientColor()[appContext.darkTheme][appContext.darkTheme ? 0 : 1], fontSize: 12}}>{appContext.clientName}</Text>
							</View>}
						</View>
					</View>
					<Appbar.Content />
					{
						{
							loading:<Button></Button>,
							connected:<><UsersCounter appContext={appContext}/></>,
							fail:<Button></Button>,
							false:<Button textColor={theme.colors.error}>Failed to connect, server offline.</Button>,
						}[loading]
					}
				</Appbar.Header>
				{
					((loading == "loading") || (loading == "connected" && (appContext.piecesLocations === false))) ? <ProgressBar indeterminate={true} style={{backgroundColor: appContext.themes.current().colors.background}} /> : <></>
				}
				<BottomNavigation
					navigationState={{ index, routes }}
					onIndexChange={setIndex}
					renderScene={renderScene}
				/>
				<Portal>
					<ClientNameDialog appContext={appContext} firstTime={routes[index].key == "home"} confirm={() => {
						setLoading('ready')
					}} show={appContext.showUpdateUsernameDialog}/>
				</Portal>
				{(routes[index].key !== "messaging" && loading == "connected") ? <MessagesListener appContext={appContext}/> : <></>}
				{(loading == "connected") && <NewUserListener appContext={appContext} />}
			</AppContextProvider>
	);
}
