import { useState, createContext } from 'react';

const AppContext = createContext()

function AppContextProvider(props) {
    const [stuff, setStuff] = useState('foo');
	const [darkTheme, setDarkTheme] = useState(true)

    return <AppContextProvider value={{
        stuff,
        setStuff,
        darkTheme,
        setDarkTheme,
    }}>
        {props.children}
    </AppContextProvider>
}

export {
    AppContextProvider,
    AppContext,
}
