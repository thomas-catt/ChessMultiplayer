import { List, Text, TextInput } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { createRef, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { broadcastTextMessage, onTextMessageReceive } from '../scripts/Socket'

function MessagesListView(props) {
	const { appContext } = props.context
    const [messagesList, setMessagesList] = useState(appContext.messagesList)

    const theme = appContext.themes.current()

    onTextMessageReceive((m) => {
        if ((m.userId === appContext.clientId)) {
            appContext.messagesList = appContext.messagesList.map(a => a.id === m.id ? {...a, sent: true, own: true} : {...a})
        } else {
            const newMsg = {...m, sent: true, own: m.userId === appContext.clientId}
            appContext.messagesList =  [newMsg, ...appContext.messagesList]
        }

        setMessagesList(appContext.messagesList)
    })

    return <ScrollView>
    {
        appContext.messagesList.length == 0 ? <Text style={{alignSelf: "stretch", textAlign: "center", opacity: 0.3, paddingVertical: 200}}>Type messages above to start chatting :)</Text> : true
    }
    {
        appContext.messagesList.map(message => { 
            let messageTime = new Date(message.timestamp)
            messageTime = {
                hours: (messageTime.getHours() > 12 ? messageTime.getHours() - 12 : messageTime.getHours()),
                minutes: messageTime.getMinutes(),
                ampm: messageTime.getHours() > 12 ? "PM" : "AM"
            }
            messageTime = {
                ...messageTime,
                hours: messageTime.hours < 10 ? "0"+messageTime.hours : messageTime.hours,
                minutes: messageTime.minutes < 10 ? "0"+messageTime.minutes : messageTime.minutes,
            }
            messageTime = messageTime.hours + ":" + messageTime.minutes + ":" + messageTime.ampm
            return (
            <List.Item
                style={{opacity: message.sent ? 1 : 0.5}}
                key={message.id}
                title={message.fullname}
                description={message.message + " - [" + messageTime + "]"}
                left={() => <List.Icon
                    style={{borderRadius: 100, backgroundColor: message.own ? theme.colors.primary : ""}}
                    icon={"message"}
                    color={message.own ? theme.colors.surface : theme.colors.inverseSurface} />}
            />
        )})
    }
    </ScrollView>
}

export default function Messaging(props) {
	const { appContext } = props.context

    const [messagesList, setMessagesList] = useState(appContext.messagesList)
    const [textMessage, setTextMessage] = useState("")

    const onSubmitTextMessage = () => {
        let preparedMessage = {
            id: uuidv4(),
            message: textMessage,
            fullname: appContext.clientName,
            userId: appContext.clientId,
            timestamp: new Date().getTime(),
            timezoneOffset: new Date().getTimezoneOffset()
        }
        setTextMessage("")
        preparedMessage.sent = false
        preparedMessage.own = true
        appContext.messagesList = [preparedMessage, ...appContext.messagesList]
        setMessagesList(appContext.messagesList)
        broadcastTextMessage({...preparedMessage, sent: undefined, own: undefined})
    }

    return <View>
        <TextInput blurOnSubmit={false} style={{
            margin: 10,
        }} value={textMessage} label={"Enter Message to broadcast!"} onChangeText={setTextMessage} onSubmitEditing={onSubmitTextMessage}/>
        <MessagesListView context={props.context} />
    </View>
}