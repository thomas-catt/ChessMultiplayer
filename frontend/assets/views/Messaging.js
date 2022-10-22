import { List, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { AppContext } from '../scripts/AppContext'
import { broadcastTextMessage, onTextMessageReceive } from '../scripts/Socket'

export default function Home() {
	const appContext = useContext(AppContext)

    const [textMessage, setTextMessage] = useState("")
    const [messagesList, setMessagesList] = useState([
        {
            id: uuidv4(),
            message: 'this is a message. its still sending...',
            fullname: "You",
            user: appContext.clientId,
            timestamp: new Date().getTime(),
            timezoneOffset: new Date().getTimezoneOffset(),
            sent: false,
            own: true
        },
        {
            id: uuidv4(),
            message: 'this is another message',
            fullname: "You",
            user: appContext.clientId,
            timestamp: new Date().getTime() - 10000,
            timezoneOffset: new Date().getTimezoneOffset(),
            sent: true,
            own: true
        },
        {
            id: uuidv4(),
            message: 'this is yet another message, but this time its not from me.',
            fullname: "Joe Biden",
            user: 'nugget',
            timestamp: new Date().getTime() - 30000,
            timezoneOffset: new Date().getTimezoneOffset(),
            sent: true,
            own: false
        },
    ])
    const theme = appContext.themes.current()

    const onSubmitTextMessage = () => {
        setTextMessage("")
        broadcastTextMessage({
            id: uuidv4(),
            message: textMessage,
            fullname: appContext.clientName,
            userId: appContext.clientId,
            timestamp: new Date().getTime(),
            timezoneOffset: new Date().getTimezoneOffset()
        })
    }

    onTextMessageReceive((m) => {
        const messagesIds = messagesList.map(a => a.id)
        const confirmingMessage = messagesIds.find(m.id)
        if ((m.user === appContext.clientId) && (confirmingMessage !== undefined)) {
            let newMessagesList = messagesList
            newMessagesList[messagesIds.indexOf(m.id)] = {...confirmingMessage, sent: true, own: true}
            setMessagesList(newMessagesList)
        } else {
            const newMsg = {...m, sent: true, own: false}
            setMessagesList({...messagesList, newMsg})
        }
    })

    console.log(theme)

    return <View>
        <TextInput style={{
            margin: 10,
        }} value={textMessage} label={"Enter Message to broadcast!"} onChangeText={setTextMessage} onSubmitEditing={onSubmitTextMessage}/>
        
        {
            messagesList.sort( (a, b) => a.timestamp < b.timestamp).map(message => { return (
                <List.Item
                    style={{opacity: message.sent ? 1 : 0.5}}
                    key={message.id}
                    title={message.fullname}
                    description={message.message}
                    left={() => <List.Icon
                        style={{borderRadius: 100, backgroundColor: message.own ? theme.colors.primary : ""}}
                        icon={"message"}
                        color={message.own ? theme.colors.surface : theme.colors.inverseSurface} />}
                />
            )})
        }
        
    </View>
}