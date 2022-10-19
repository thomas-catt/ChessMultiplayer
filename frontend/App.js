import { useContext, useState } from 'react';
import { AppRegistry } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { expo } from './app.json';
import App from './assets/views/App'
import { AppContext, AppContextProvider } from './assets/AppContext'

const materialLightTheme = {
	...MD3LightTheme,
	mode: "adaptive",
	colors: {
		...MD3LightTheme.colors,
	}
}


const materialDarkTheme = {
	...MD3DarkTheme,
	mode: "adaptive",
	colors: {
		...MD3DarkTheme.colors,
	}
}

function AppComponent() {
	const appContext = useContext(AppContext)
	const { darkTheme, setDarkTheme } = appContext
	const [ paperDarkTheme, setPaperDarkTheme ] = useState(darkTheme)

	function onThemeToggle() {
		setDarkTheme(!darkTheme)
		setPaperDarkTheme(!paperDarkTheme)
	}
	
	let theme = darkTheme ? materialDarkTheme : materialLightTheme
	return <PaperProvider theme={theme}>
		<App theme={theme} darkTheme={darkTheme} changeTheme={onThemeToggle}/>
	</PaperProvider>			
}

export default function Main() {
	return (
		<AppContextProvider>
			<AppComponent/>
		</AppContextProvider>
	)
}

AppRegistry.registerComponent(expo.name, () => Main);