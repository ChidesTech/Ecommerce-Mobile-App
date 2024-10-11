import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, ImageBackground, Dimensions, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { useRoute } from "@react-navigation/native"
const { height, width } = Dimensions.get("window");
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../redux/CartReducer';


const CartScreen = () => {
    const route = useRoute();

    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);


    const addToCartHandler = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        },2000)
    }
    console.log(cart);

    return (
        <SafeAreaView style={{ paddingTop: Platform === "android" ? 40 : 0, flex: 1, backgroundColor: "white" }}>
            <ScrollView showVerticalScrollIndicator={false}>
                <Header />
               <View style={{padding : 10, flexDirection :"row", alignItems : "center"}}>
                <Text style={{fontSize : 17, fontWeight : "500"}}>Subtotal: </Text>
                <Text style={{fontSize : 20, fontWeight : "bold"}}>4,230,000</Text>
               </View>

               

            </ScrollView>


        </SafeAreaView>

    )
}

export default CartScreen

const styles = StyleSheet.create({})