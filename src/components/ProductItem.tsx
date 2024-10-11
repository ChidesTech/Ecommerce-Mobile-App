import { StyleSheet, Text, View , Alert} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Pressable, Image, Dimensions } from 'react-native'
import AntIcon from "react-native-vector-icons/AntDesign"
import {useSelector, useDispatch} from "react-redux";
import { addToCart } from '../redux/CartReducer';


const width = Dimensions.get('window').width

const ProductItem = ({product}) => {
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);

  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();


  const addToCartHandler = (item) => {
    setAddedToCart(true);
     dispatch(addToCart(item));
     setTimeout(() => {
      setAddedToCart(false)
     }, 2000)
  }


  console.log(cart);



  return (
   <Pressable 
   style={{width : 0.46 * width, marginHorizontal : 0.02 * width, marginVertical : 10,
    borderWidth : 2, borderColor : "whitesmoke", padding: 10, borderRadius : 10}}
    onPress={()=>navigation.navigate("ProductDetails", {...product})}>
  <Image source={{uri : product?.image}} style={{width : 150, height : 150, resizeMode : "contain"}} />
  <Text numberOfLines={1} style={{marginTop : 10}}>{product?.title}</Text>
  <View style={{marginTop : 6, alignItems : "center"}}>
    <Text style={{color : "orangered", fontWeight : "bold", fontSize : 16}}>₦{product?.price} </Text>
    <Text style={{marginTop : 3}}> <AntIcon style={{color : "goldenrod", fontSize : 16}} name="star"/> {product?.rating?.rate} (2,100)</Text>
  </View>

  <Pressable onPress={() => addToCartHandler(product)}style={{backgroundColor : "orangered", padding : 10, borderRadius : 20, justifyContent : "center", alignItems : "center", marginTop : 10}}>
    <Text style={{fontSize : 13, fontWeight : "bold"}}>{addedToCart? "Added To Cart" : "Add To Cart"}</Text>
  </Pressable>
   </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})