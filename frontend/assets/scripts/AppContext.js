import { useState, createContext } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { Platform } from 'react-native';

const AppContext = createContext()

function AppContextProvider(props) {
    const [Socket, setSocket] = useState();
    const [usersCount, setUsersCount] = useState(-1);
    const clientId = uuidv4().split("-")[0].toUpperCase()
    const clientName = Platform.select({android: "AndroidClient", ios: "iOSClient", default: "WebClient"}) + " " + clientId
    const [messagesList, setMessagesList] = useState([{id: 'a', message: "hello lol"}])
	const [darkTheme, setDarkTheme] = useState(true)
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
        Socket,
        setSocket,
        usersCount,
        setUsersCount,
        clientId,
        clientName,
        messagesList,
        setMessagesList,
        darkTheme,
        setDarkTheme,
        themes
    }}>
        {props.children}
    </AppContext.Provider>
}

export {
    AppContextProvider,
    AppContext
}
