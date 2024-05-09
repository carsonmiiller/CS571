import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [valueDisplayed, setValueDisplayed] = React.useState(0);
  const [valueToBeAdded, setValueToBeAdded] = React.useState(0);

  function reset(){
    setValueDisplayed(0);
    setValueToBeAdded(0);
    this.textInput.clear()
  }
  
  function add(){
    setValueDisplayed(valueDisplayed + valueToBeAdded);
    setValueToBeAdded(0);
    this.textInput.clear()
  }

  return (
    <View style={styles.container}>
      <Text>Your total is {valueDisplayed}</Text>
      <TextInput
        placeholder="Enter number here"
        keyboardType="numeric"
        onChangeText={(text) => {
          setValueToBeAdded(parseFloat(text));
        }}
        ref={input => { this.textInput = input }}
      />
      <Button
        title="Add"
        onPress={add}
      />
      <Button
        title="Reset"
        onPress={reset}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
