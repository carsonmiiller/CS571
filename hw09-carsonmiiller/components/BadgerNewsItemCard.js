import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Animated } from "react-native";

export default function BadgerNewsItemCard(props) {

    const op = useRef(new Animated.Value(0.01)).current;

    useEffect(() => {
        Animated.timing(op, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = () => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${props.id}`, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        })
        .then(response => response.json())
        .then(data => {
            props.setModal(data);
        })
    };

    return <><Pressable onPress={handlePress} onLongPress={props.onLongPress} style={styles.article}>
        <Animated.View style={{opacity: op}}>
            <View style={{paddingTop: 10, alignItems: "center"}}>
                <Image 
                    source={{uri: props.img}}
                    style={{width: 300, height: 300}}
                />
            </View>
            <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>
                    {props.title}
                </Text>
            </View>
        </Animated.View>
    </Pressable>
    <Text></Text>
    </>
}

const styles = StyleSheet.create({
    article: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        padding: 5
    }
});
