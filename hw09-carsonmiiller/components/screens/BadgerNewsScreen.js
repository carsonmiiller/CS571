import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Modal, Image, Text, Button, Animated } from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import { ScrollView } from "react-native-gesture-handler";

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState([]);
    const [popoutShown, setPopoutShown] = useState(false);
    const [popoutData, setPopoutData] = useState();
    let textOp = useRef(new Animated.Value(0.01)).current;

    const closeModal = () => {
        setPopoutShown(false);
        fadeOut();
    }
    
    const setModal = (info) => {
        setPopoutData(info);
    };
    
    useEffect(() => {
    if(popoutData) {
        setPopoutShown(true)
        fadeIn();
    }
    }, [popoutData])

    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setArticles(data)
            })
    }, []);

    fadeIn = () => {
        Animated.timing(textOp, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true
        }).start();
    };

    fadeOut = () => {
        Animated.timing(textOp, {
            toValue: 0.01,
            duration: 100,
            useNativeDriver: true
        }).start();
    };

    return <ScrollView style={styles.container}>
        <View>
            {
                articles.map(article => <BadgerNewsItemCard key={article.id} id={article.id} title={article.title} img={article.img} tags={article.tags} setModal={setModal}/>)
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={popoutShown}
                onRequestClose={closeModal}>
                <ScrollView>
                    <View
                        style={[styles.modalView, {
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                        }]}>
                        <Image
                            source={{
                                uri: popoutData?.img,
                            }}
                            style={{width: 300, height: 300}}
                        />
                        <Text style={{fontSize: 30}}>{popoutData?.title}</Text>
                        <Animated.View style={{opacity: textOp}}>
                            {
                                popoutData?.body.map((paragraph, index) => <Text key={index} style={{fontSize:16, textAlign: 'left', paddingBottom:8}}>{paragraph}</Text>)
                            }
                        </Animated.View>
                        <Button title="Close Article" onPress={closeModal}></Button>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
      margin: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }
});

export default BadgerNewsScreen;