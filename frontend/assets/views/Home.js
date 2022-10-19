// continue socketio
import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useState } from 'react';

import { AppContext } from '../AppContext'

export default function Home() {
    const appContext = useContext(AppContext)

    
    return <View style={{padding: 32, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Text variant='displaySmall'>{appContext.stuff}</Text>
    </View>
}