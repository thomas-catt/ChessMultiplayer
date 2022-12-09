import { useState, createContext, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { expo } from '../../app.json';
import { piecesData as constPiecesData, clientId, clientIdShort, getClientColor } from './Constants'
import { Appearance, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext()

let defaultValues = {
    firstTime: null,
    clientName: Platform.select({android: "AndroidClient", ios: "iOSClient", default: "WebClient"}) + " " + clientIdShort,
    clientId: clientId,
    boardFlipped: false,
    themePreference: "S",
    notifyMessages: true,
}

function AppContextProvider(props) {
    async function init() {
        let storedClientId = false
        try {
            storedClientId = await AsyncStorage.getItem("@clientId")
        } catch (e) {
            console.error(e)
        }
        if (storedClientId) {
            if (defaultValues.firstTime == null) defaultValues.firstTime = false
            defaultValues.clientId = storedClientId
            defaultValues.clientName = await AsyncStorage.getItem("@clientName")
            defaultValues.boardFlipped = await AsyncStorage.getItem("@boardFlipped")
            defaultValues.themePreference = await AsyncStorage.getItem("@themePreference")
            defaultValues.notifyMessages = await AsyncStorage.getItem("@notifyMessages")
            console.log("Not first time 💀", storedClientId)

            setClientName(defaultValues.clientName)
            setBoardFlipped(defaultValues.boardFlipped)
            setThemePreference(defaultValues.themePreference)
            setNotifyMessages(defaultValues.notifyMessages)
        } else {
            defaultValues.firstTime = true
            await AsyncStorage.setItem("@clientId", defaultValues.clientId)
            await AsyncStorage.setItem("@clientName", defaultValues.clientName)
            await AsyncStorage.setItem("@boardFlipped", defaultValues.boardFlipped)
            await AsyncStorage.setItem("@themePreference", defaultValues.themePreference)
            await AsyncStorage.setItem("@notifyMessages", defaultValues.notifyMessages)
            setShowUpdateUsernameDialog(true)
            console.log("First Time 🤨")
        }


    }
    init()

    const [_update, update] = useState();
    const metadata = expo
    const [clientName, setClientName] = useState(defaultValues.clientName)
    let messagesList = []
    const [piecesLocations, setPiecesLocations] = useState(false)
	const [socketReady, setSocketReady] = useState(false)
	const [boardFlipped, setBoardFlipped] = useState(defaultValues.boardFlipped)
	const [themePreference, setThemePreference] = useState(defaultValues.themePreference)
	const [notifyMessages, setNotifyMessages] = useState(defaultValues.notifyMessages)
	const [showUpdateUsernameDialog, setShowUpdateUsernameDialog] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(() => {
        if (themePreference == "S")
            setDarkTheme(Appearance.getColorScheme() == 'dark')
        else
            setDarkTheme(themePreference == "D")
    }, [themePreference])

    const saveItem = (key, value) => {
        AsyncStorage.mergeItem("@" + key, value)
    }

    
    
    const themes = {
        // Set status bar color in these themes
        light: {
            ...MD3LightTheme,
            mode: "adaptive",
            colors: {
                ...MD3LightTheme.colors,
            }
        },      
        dark: {
            ...MD3DarkTheme,
            mode: "adaptive",
            colors: {
                ...MD3DarkTheme.colors,
            }
        },
        current: () => darkTheme ? themes.dark : themes.light
    }

    return <AppContext.Provider value={{
        update,
        metadata,
        clientId: defaultValues.clientId,
        clientIdShort,
        clientName, setClientName,
        messagesList,
        constPiecesData,
        socketReady, setSocketReady,
        piecesLocations, setPiecesLocations,
        boardFlipped, setBoardFlipped,
        themePreference, setThemePreference,
        notifyMessages, setNotifyMessages,
        showUpdateUsernameDialog, setShowUpdateUsernameDialog,
        darkTheme, setDarkTheme,
        themes,
        saveItem,
    }}>
        {props.children}
    </AppContext.Provider>
}

export {
    AppContextProvider,
    AppContext
}
