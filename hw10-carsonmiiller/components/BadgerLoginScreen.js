import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text style={{ fontSize: 24 }}>Username</Text>
        <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
        />
        <Text style={{ fontSize: 24 }}>Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
        />
        <Button color="crimson" title="Login" onPress={() => props.handleLogin(username, password)}/>
        <Text style={{ fontSize: 18, paddingTop: 20 }}>New here?</Text>
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default BadgerLoginScreen;