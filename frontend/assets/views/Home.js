// continue socketio
import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export default function Home() {
	const [loading, setLoading] = useState(false)

    return <View style={{padding: 32}}>
        <Text variant='displaySmall'>Hello World</Text>
		<Text>Press the button below to connect to SocketIO:</Text>
        <Button style={{marginVertical: 10}} icon="power-plug" mode='contained' loading={loading} disabled={loading} onPress={() => setLoading(!loading)}>
            {loading ? "Connecting..." : "Connect to SocketIO"}
        </Button>        
    </View>
}