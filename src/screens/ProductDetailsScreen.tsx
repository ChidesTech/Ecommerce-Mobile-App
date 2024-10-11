import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, ImageBackground, Dimensions, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { useRoute } from "@react-navigation/native"
const { height, width } = Dimensions.get("window");
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../redux/CartReducer';


const ProductDetailsScreen = () => {
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    {route.params.carouselImages.map((image, index) => {
                        return <ImageBackground style={{ width, height: width, marginTop: 25, resizeMode: "contain" }} source={{ uri: image }} key={index} >
                            <View style={{
                                width: 40, height: 40, borderRadius: 20, backgroundColor: "whitesmoke", alignItems: "center",
                                justifyContent: "center", flexDirection: "row", marginTop: "auto",
                                marginLeft: 10, marginBottom: 20
                            }}>
                                <AntIcon name="hearto" size={24} color="black" />
                            </View>
                        </ImageBackground>
                    })}

                </ScrollView>

                <View style={{ padding: 10, }}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>{route?.params?.title}</Text>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 5 }}>₦{route?.params?.price}</Text>
                </View>
                <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <Text>Colour: </Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route?.params?.color}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <Text>Size: </Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route?.params?.size}</Text>
                </View>
                <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>Total: ₦{route.params.price}</Text>
                </View>

                <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>IN STOCK</Text>

                <Pressable onPress={() => addToCartHandler(route.params)} style={{
                    backgroundColor: "orangered", padding: 10, borderRadius: 20,
                    justifyContent: "center", alignItems: "center", margin: 10
                }}>
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>{addedToCart? "Added To Cart" : "Add To Cart"}</Text>
                </Pressable>
                <Pressable style={{
                    backgroundColor: "rgb(246, 87, 29)", padding: 10, borderRadius: 20,
                    justifyContent: "center", alignItems: "center", margin: 10
                }}>
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>Buy Now</Text>
                </Pressable>

            </ScrollView>


        </SafeAreaView>

    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({})