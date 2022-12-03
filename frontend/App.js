import { useContext, useState } from 'react';
import { AppRegistry } from 'react-native';
import { expo } from './app.json';
import App from './assets/views/App'
import { AppContext, AppContextProvider } from './assets/scripts/AppContext'
import { Provider as PaperProvider } from 'react-native-paper';

function AppContainer() {
	const appContext = useContext(AppContext)

	function onThemeToggle() {
		appContext.setDarkTheme(!appContext.darkTheme)
	}
	
	let theme = appContext.themes.current()
	return <PaperProvider theme={theme}>
		<App context={{appContext, AppContextProvider}} darkTheme={appContext.darkTheme} changeTheme={onThemeToggle}/>
	</PaperProvider>
}

export default function Main() {
	return (
		<AppContextProvider>
			<AppContainer />
		</AppContextProvider>
	)
}

AppRegistry.registerComponent(expo.name, () => Main);