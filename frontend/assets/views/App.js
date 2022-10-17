import { StatusBar } from 'expo-status-bar';
import { Appbar, BottomNavigation, Button, Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import Home from './Home'
import More from './More'


export default function App(props) {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
	  { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
	  { key: 'more', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
		more: More,
	})

    return (<>
		<Appbar dark={true}>
			<Appbar.Action icon="chess-queen" />
			<Appbar.Content title="Chess App" />
			<Appbar.Action icon="brightness-6" onPress={props.changeTheme} />
		</Appbar>
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>		
	</>
	);
	<ScrollView
		style={{backgroundColor: 'black', flex: 1, padding: 32,}}
		contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
		<Home />
    </ScrollView>
}

/*
module.exports = function () {
	return (
		<View style={styles.app}>
			<View style={styles.container}>
				<Text>Hello World!</Text>
				<Button text="Connect WS" />
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	app: {
		backgroundColor: 'black',
		color: 'white',
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});
*/