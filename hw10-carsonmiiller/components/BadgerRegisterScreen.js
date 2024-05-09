import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SecureStore } from "expo-secure-store";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
        <Text style={{ fontSize: 24 }}>Confirm Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
        />
        <Button color="crimson" title="Signup" onPress={() => {props.handleSignup(username, password, confirmPassword)}} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;