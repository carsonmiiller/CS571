
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw6/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_f6cf574eb476d5ada941",
      }
    })
    .then(res => res.json())
    .then(json => {
      setChatrooms(json)
    })
  }, []);

  function handleLogin(username, password) {
    // check if all fields are valid
    if(username === "" || password === "") {
    Alert.alert("Please fill out all fields");
    return;
    }

    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_f6cf574eb476d5ada941"
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
      credentials: "include"
    })
    .then(res => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        Alert.alert('Successfully logged in!')
        return res.json();
      } else if (res.status === 404) {
        Alert.alert('Username does not exist!')
      } else if (res.status === 401) {
        Alert.alert('Incorrect password!')
      }
    }).then(json => {
      SecureStore.setItemAsync("jwt", json.token);
    })
  }

  function handleSignup(username, password, confirmPassword) {
    // check if all fields are valid
    if(username === "" || password === "") {
      Alert.alert("Please fill out all fields");
      return;
    }

    if(password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_f6cf574eb476d5ada941"
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
      credentials: "include"
    })
    .then(res => {
      if (res.status === 200) {
        Alert.alert('Successfully registerd!')
        setIsRegistering(false);
        setIsLoggedIn(true);
        return res.json();
      } else if (res.status === 409) {
        Alert.alert('Username already exists!')
      } else if (res.status === 413) {
        Alert.alert('Maximum username length is 64 characters! Maximum password length is 128 characters!')
      } else if (res.status === 414) {
        Alert.alert('Password is too long!')
      }
    })
    .then(json => {
      if(json === undefined) return;
      SecureStore.setItemAsync("jwt", json.token);
    })
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom}/>}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Logout" drawerInactiveBackgroundColor="red">
            {(props) => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn}/>}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering}/>
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering}/>
  }
}


