import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

export default function Home() {
    return <View style={{padding: 32}}>
        <Text variant='displaySmall'>Settings</Text>
		<Text>Simbles my Bimbles.</Text>
    </View>
}