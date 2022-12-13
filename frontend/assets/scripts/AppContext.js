import { useState, createContext, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { expo } from '../../app.json';
import { piecesData as constPiecesData, constClientId, clientIdShort, getClientColor } from './Constants'
import { Appearance, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext()

let defaultValues = {
    firstTime: null,
    clientName: Platform.select({android: "AndroidClient", ios: "iOSClient", default: "WebClient"}) + " " + clientIdShort,
    clientId: constClientId,
    boardFlipped: false,
    themePreference: "S",
    notifyMessages: true,
}

function AppContextProvider(props) {
    const [_update, update] = useState();
    const metadata = expo
    const [clientId, setClientId] = useState(defaultValues.clientId)
    const [clientName, setClientName] = useState(defaultValues.clientName)
    let messagesList = []
    const [piecesLocations, setPiecesLocations] = useState(false)
	const [socketReady, setSocketReady] = useState(false)
	const [boardFlipped, setBoardFlipped] = useState(defaultValues.boardFlipped)
	const [themePreference, setThemePreference] = useState(defaultValues.themePreference)
	const [notifyMessages, setNotifyMessages] = useState(defaultValues.notifyMessages)
	const [showUpdateUsernameDialog, setShowUpdateUsernameDialog] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)
    const [takingTooLong, setTakingTooLong] = useState(false)
    const [saveDataLoaded, setSaveDataLoaded] = useState(false)

    useEffect(() => {
        if (themePreference == "S")
            setDarkTheme(Appearance.getColorScheme() == 'dark')
        else
            setDarkTheme(themePreference == "D")

        console.log(clientId)
    }, [themePreference])

    async function loadSavedData() {
        let isSaveDataPresent = false
        try {
            isSaveDataPresent = await AsyncStorage.getItem("chessableData")
        } catch (e) {
            console.error(e)
        }
        if (isSaveDataPresent) {
            if (defaultValues.firstTime == null) {
                defaultValues.firstTime = false
                const savedData = JSON.parse(await AsyncStorage.getItem("chessableData"))
                
                defaultValues.clientId = savedData.clientId
                defaultValues.clientName = savedData.clientName
                defaultValues.boardFlipped = savedData.boardFlipped
                defaultValues.themePreference = savedData.themePreference
                defaultValues.notifyMessages = savedData.notifyMessages
                console.log("Not first time 💀", savedData.clientId)

                setClientId(savedData.clientId)
                setClientName(savedData.clientName)
                setBoardFlipped(savedData.boardFlipped)
                setThemePreference(savedData.themePreference)
                setNotifyMessages(savedData.notifyMessages)
            }
        } else {
            defaultValues.firstTime = true
            await AsyncStorage.setItem("chessableData", JSON.stringify({
                clientId: defaultValues.clientId,
                clientName: defaultValues.clientName,
                boardFlipped: defaultValues.boardFlipped,
                themePreference: defaultValues.themePreference,
                notifyMessages: defaultValues.notifyMessages,
            }))
            setClientId(defaultValues.clientId)
            setShowUpdateUsernameDialog(true)
            console.log("First Time 🤨")
        }
        setSaveDataLoaded(true)
    }
    if (defaultValues.firstTime === null) loadSavedData()


    
    const saveItem = async (key, value) => {
        try {
            const savedData = JSON.parse(await AsyncStorage.getItem("chessableData"))
            AsyncStorage.mergeItem("chessableData", JSON.stringify({...savedData, [key]: value}))
        } catch (e) {
            console.log(e)
        }
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
        clientId,
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
        takingTooLong, setTakingTooLong,
        saveDataLoaded,
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
