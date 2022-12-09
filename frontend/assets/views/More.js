import { Avatar, Button, Chip, Dialog, List, Portal, RadioButton, Switch, Text, TouchableRipple } from 'react-native-paper';
import { ScrollView, StyleSheet, Touchable, View } from 'react-native';
import { useState } from 'react';
import { getClientColor } from '../scripts/Constants';

const SettingTile = (props) => {
    return <List.Item
        {...props} left={() => <List.Icon icon={props.icon}/>}
    />
}

export default function More(props) {
    const { appContext } = props.context
    
    const [appThemeChangeDialog, setAppThemeChangeDialog] = useState(false)
    const [themePreference, setThemePreference] = useState(appContext.themePreference)
    const dismissAppThemeChangeDialog = () => {
        setAppThemeChangeDialog(false)
        appContext.setThemePreference(themePreference)
    }

    // const saveSetting = (key, value) => {
        
    // }

    const clientColor = getClientColor()[appContext.darkTheme]

    return <ScrollView contentContainerStyle={{padding: 24}}>
        <Text variant='displaySmall' style={{marginTop: 70, marginBottom: 30}}>Settings</Text>

        <SettingTile
            title="App Theme"
            description={{L: "Light", D: "Dark", S: "System"}[appContext.themePreference] || "?"}
            icon="brightness-6"
            onPress={() => setAppThemeChangeDialog(true)}/>
            
        <SettingTile
            title="Flip Board"
            description={"Flip the Chess Board direction vertically"} icon="flip-vertical"
            right={() => <Switch style={{margin: 20}} value={appContext.boardFlipped}/>}
            onPress={() => appContext.setBoardFlipped(!appContext.boardFlipped)} />
            
        <SettingTile
            title="Show Chat Messages"
            description={"Show a notification at the bottom when a new message is received"} icon="message-alert"
            right={() => <Switch style={{margin: 20}} value={appContext.notifyMessages}/>}
            onPress={() => appContext.setNotifyMessages(!appContext.notifyMessages)} />
            
        <SettingTile
            title="Change name"
            description={"You can update your name here"}
            onPress={() => appContext.setShowUpdateUsernameDialog(true)} icon="open-in-new"/>

        <Portal>
            <Dialog visible={appThemeChangeDialog} onDismiss={dismissAppThemeChangeDialog}>
                <Dialog.Title>Change App Theme</Dialog.Title>
                <Dialog.Content>
                <RadioButton.Group onValueChange={(v) => setThemePreference(v)} value={themePreference}>
                    <TouchableRipple onPress={() => setThemePreference("S")}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <RadioButton value="S" />
                            <Text>System Theme</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => setThemePreference("L")}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <RadioButton value="L" />
                            <Text>Light</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => setThemePreference("D")}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <RadioButton value="D" />
                            <Text>Dark</Text>
                        </View>
                    </TouchableRipple>
                </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={dismissAppThemeChangeDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
                
        <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Text variant='labelLarge' style={{opacity: 0.5}}>Your accent color is </Text>
            <Chip style={{backgroundColor: clientColor[1], borderWidth: 1, borderRadius: 100, borderColor: clientColor[0]}} textStyle={{color: clientColor[0]}}>{clientColor[2]}</Chip>
        </View>

        <View style={{marginTop: 100, opacity: 0.5, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Text variant="bodyMedium">{appContext.metadata.name}</Text>
            <Text>v{appContext.metadata.version} – {appContext.metadata.author}</Text>
        </View>
    </ScrollView>
}