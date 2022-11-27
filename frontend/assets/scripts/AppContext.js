import { useState, createContext } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { Platform } from 'react-native';

const AppContext = createContext()
const clientId = uuidv4()
const clientIdShort = clientId.substring(0, 4).toUpperCase()

function AppContextProvider(props) {
    const [_update, update] = useState();
    const clientName = Platform.select({android: "AndroidClient", ios: "iOSClient", default: "WebClient"}) + " " + clientIdShort
    let messagesList = []
    const constPiecesData = [
        {id: 'Pawn1', side: 'white', name: "pawn"},
        {id: 'Pawn2', side: 'white', name: "pawn"},
        {id: 'Pawn3', side: 'white', name: "pawn"},
        {id: 'Pawn4', side: 'white', name: "pawn"},
        {id: 'Pawn5', side: 'white', name: "pawn"},
        {id: 'Pawn6', side: 'white', name: "pawn"},
        {id: 'Pawn7', side: 'white', name: "pawn"},
        {id: 'Pawn8', side: 'white', name: "pawn"},
        {id: 'Knight1', side: 'white', name: "knight"},
        {id: 'Knight2', side: 'white', name: "knight"},
        {id: 'Bishop1', side: 'white', name: "bishop"},
        {id: 'Bishop2', side: 'white', name: "bishop"},
        {id: 'Rook1', side: 'white', name: "rook"},
        {id: 'Rook2', side: 'white', name: "rook"},
        {id: 'King', side: 'white', name: "king"},
        {id: 'Queen1', side: 'white', name: "queen"},
        {id: 'Queen2', side: 'white', name: "queen"},
        {id: 'Queen3', side: 'white', name: "queen"},
        {id: 'Queen4', side: 'white', name: "queen"},
        {id: 'Queen5', side: 'white', name: "queen"},
        {id: 'Queen6', side: 'white', name: "queen"},
        {id: 'Queen7', side: 'white', name: "queen"},
        {id: 'Queen8', side: 'white', name: "queen"},
        {id: 'Queen9', side: 'white', name: "queen"},
        {id: 'Pawn1', side: 'black', name: "pawn"},
        {id: 'Pawn2', side: 'black', name: "pawn"},
        {id: 'Pawn3', side: 'black', name: "pawn"},
        {id: 'Pawn4', side: 'black', name: "pawn"},
        {id: 'Pawn5', side: 'black', name: "pawn"},
        {id: 'Pawn6', side: 'black', name: "pawn"},
        {id: 'Pawn7', side: 'black', name: "pawn"},
        {id: 'Pawn8', side: 'black', name: "pawn"},
        {id: 'Knight1', side: 'black', name: "knight"},
        {id: 'Knight2', side: 'black', name: "knight"},
        {id: 'Bishop1', side: 'black', name: "bishop"},
        {id: 'Bishop2', side: 'black', name: "bishop"},
        {id: 'Rook1', side: 'black', name: "rook"},
        {id: 'Rook2', side: 'black', name: "rook"},
        {id: 'King', side: 'black', name: "king"},
        {id: 'Queen1', side: 'black', name: "queen"},
        {id: 'Queen2', side: 'black', name: "queen"},
        {id: 'Queen3', side: 'black', name: "queen"},
        {id: 'Queen4', side: 'black', name: "queen"},
        {id: 'Queen5', side: 'black', name: "queen"},
        {id: 'Queen6', side: 'black', name: "queen"},
        {id: 'Queen7', side: 'black', name: "queen"},
        {id: 'Queen8', side: 'black', name: "queen"},
        {id: 'Queen9', side: 'black', name: "queen"},
    ]
    const [piecesLocations, setPiecesLocations] = useState(false)
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
        update,
        clientId,
        clientIdShort,
        clientName,
        messagesList,
        constPiecesData,
        piecesLocations, setPiecesLocations,
        darkTheme, setDarkTheme,
        themes
    }}>
        {props.children}
    </AppContext.Provider>
}

export {
    AppContextProvider,
    AppContext
}
