import { Text, View, Image } from "react-native";

export default function BadgerBakedGood(props) {


    
    return <View style={{justifyContent: "center", alignItems: "center"}}>
        <Text>I am a {props.name}</Text>
        <Text>My price is ${props.price.toFixed(2)}</Text>
        <Image
            source={{uri: props.image}}
            style={{width: 200, height: 200}}
        />
        <Text>My upper bound is {props.upperBound}</Text>
        <Text></Text>
    </View>
}
