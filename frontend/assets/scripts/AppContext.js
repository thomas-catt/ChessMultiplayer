import { useState, createContext, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { expo } from '../../app.json';
import { piecesData as constPiecesData, clientId, clientIdShort, getClientColor } from './Constants'
import { Appearance, Platform } from 'react-native';

const AppContext = createContext()

function AppContextProvider(props) {
    const [_update, update] = useState();
    const metadata = expo
    const [clientName, setClientName] = useState(Platform.select({android: "AndroidClient", ios: "iOSClient", default: "WebClient"}) + " " + clientIdShort)
    let messagesList = []
    const [piecesLocations, setPiecesLocations] = useState(false)
	const [socketReady, setSocketReady] = useState(false)
	const [boardFlipped, setBoardFlipped] = useState(false)
	const [themePreference, setThemePreference] = useState("S")
	const [notifyMessages, setNotifyMessages] = useState(true)
	const [showUpdateUsernameDialog, setShowUpdateUsernameDialog] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)
    
    useEffect(() => {
        if (themePreference == "S")
            setDarkTheme(Appearance.getColorScheme() == 'dark')
        else
            setDarkTheme(themePreference == "D")
    }, [themePreference])

    
    
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
        themes,
        getClientColor
    }}>
        {props.children}
    </AppContext.Provider>
}

export {
    AppContextProvider,
    AppContext
}
