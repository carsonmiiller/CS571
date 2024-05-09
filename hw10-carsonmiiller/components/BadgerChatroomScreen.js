import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import BadgerChatMessage from "./BadgerChatMessage";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 404) {
                Alert.alert('Chatroom does not exist!')
            } else {
                throw new Error()
            }
        })
        .then(json => {
            setMessages(json.messages)
        })
    }, [props]);

    return <ScrollView>
        <View style={{ flex: 1 }}>
            {
                messages.length > 0 ?
                        messages.map(message => {
                            return <BadgerChatMessage key={message.id} id={message.id} title={message.title} content={message.content} poster={message.poster} created={message.created} room={props.chatroom}/>
                            
                        })
                    :
                        <Text>There are no messages in this chatroom yet!</Text>
            }
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerChatroomScreen;