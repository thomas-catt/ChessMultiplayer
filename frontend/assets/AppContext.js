import { useState, createContext } from 'react';

const AppContext = createContext()

function AppContextProvider(props) {
    const [stuff, setStuff] = useState('foo');
	const [darkTheme, setDarkTheme] = useState(true)

    return <AppContext.Provider value={{
        stuff,
        setStuff,
        darkTheme,
        setDarkTheme,
    }}>
        {props.children}
    </AppContext.Provider>
}

export {
    AppContextProvider,
    AppContext,
}
