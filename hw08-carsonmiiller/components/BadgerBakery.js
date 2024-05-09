import { Button, Text, View } from "react-native";
import { useState, useEffect } from "react";
import BadgerBakedGood from "./BadgerBakedGood";

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([])
    const [navigationLocation, setNavigationLocation] = useState(0)
    const [quantities, setQuantities] = useState([])

    // fetch baked goods from api
    useEffect(() => {
        fetch('https://www.cs571.org/s23/hw8/api/bakery/items', {
            method: 'GET',
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            setBakedGoods(Object.keys(json).map((key) => [key, json[key]["price"], json[key]["img"], json[key]["upperBound"]]))
            setQuantities(new Array(Object.keys(json).length).fill(0))
        })
    }, [])

    function move(direction) {
        setNavigationLocation(navigationLocation + direction);
    }

    function calcOrderTotal() {
        let total = 0;
        for (let i = 0; i < bakedGoods.length; i++) {
            total += bakedGoods[i][1] * quantities[i];
        }
        return total;
    }

    function placeOrder() {
        const order = bakedGoods.reduce((o, key) => Object.assign(o, {[key[0]]: quantities[bakedGoods.indexOf(key)]}), {})

        fetch('https://www.cs571.org/s23/hw8/api/bakery/order', {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order),
            credentials: "include"
        }).then((response) => {
            if(response.status === 200) {
                alert("Order Successfully Placed! Your total is $" + calcOrderTotal().toFixed(2))
                setQuantities(new Array(bakedGoods.length).fill(0))
            } else
                alert("Order Failed!")
        })
        .then((json) => {
            console.log(json)
        })
    }

    return <View style={{justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 24, fontWeight: "500"}}>Welcome to Badger Bakery!</Text>
        <View style={{flexDirection: "row"}}>
            <Button
                title={"prev"}
                onPress={() => {move(-1)}}
                disabled={navigationLocation === 0}
            />
            <Text style={{padding: 15}}></Text>
            <Button
                title={"next"}
                onPress={() => {move(1)}}
                disabled={navigationLocation === bakedGoods.length - 1}
            />
        </View>
        <BadgerBakedGood
            id={bakedGoods[navigationLocation][0]}
            name={bakedGoods[navigationLocation][0]}
            price={bakedGoods[navigationLocation][1]}
            image={bakedGoods[navigationLocation][2]}
            upperBound={bakedGoods[navigationLocation][3]}
        />
        <View style={{flexDirection: "row"}}>
            <Button
                title={"-"}
                onPress={() => {setQuantities(quantities.map((quantity, index) => index === navigationLocation ? quantity - 1 : quantity))}}
                disabled={quantities[navigationLocation] === 0}
            />
            <Text style={{padding: 10, fontSize: 20}}>{quantities[navigationLocation]}</Text>
            <Button
                title={"+"}
                onPress={() => {setQuantities(quantities.map((quantity, index) => index === navigationLocation ? quantity + 1 : quantity))}}
                disabled={quantities[navigationLocation] === bakedGoods[navigationLocation][3]}
            />
        </View>
        <Text style={{justifyContent: "center", alignContent: "center"}}>
            Order Total: ${calcOrderTotal().toFixed(2)}
        </Text>
        <Button
            title={"Place Order"}
            onPress={() => {placeOrder()}}
            disabled={calcOrderTotal() === 0}
        />
    </View>
}