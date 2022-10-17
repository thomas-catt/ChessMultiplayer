import { useState } from 'react';
import { AppRegistry } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { expo } from './app.json';
// const { Button } = require("./assets/components/Widgets")
import App from './assets/views/App'

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

export default function Main() {
	const [darkTheme, setDarkTheme] = useState(true)
	
	let theme = darkTheme ? materialDarkTheme : materialLightTheme
	return (
		<PaperProvider theme={theme}>
			<App theme={theme} darkTheme={darkTheme} changeTheme={() => setDarkTheme(!darkTheme)}/>
		</PaperProvider>			
	)
}

AppRegistry.registerComponent(expo.name, () => Main);