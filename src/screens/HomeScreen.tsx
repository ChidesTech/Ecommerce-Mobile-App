import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { ImageSlider } from "react-native-image-slider-banner";
import axios from 'axios';
import ProductItem from '../components/ProductItem';
const width = Dimensions.get("window").width
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../components/Header';
import { deals, offers } from '../data/index';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState();
  const [items, setItems] = useState([
    { label: "---", value: "" },
    { label: "men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" },


  ]);

  function getProducts() {

    axios.get("https://fakestoreapi.com/products").then(
      response => {
        setProducts(response.data)
      }
    ).catch(error => console.log(error))
  }





  useEffect(() => {
    getProducts()

  }, [])
  const list = [
    { id: "0", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "1", name: "Electronics", image: "https://rayconglobal.com/cdn/shop/files/H20_BLA_IMG1_grande.png?v=1713196195" },
    { id: "2", name: "Phones", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086370007" },
    { id: "3", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "4", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "5", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "6", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "7", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "8", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
    { id: "9", name: "Accessories", image: "https://i.ebayimg.com/images/g/wDIAAOSw8wZi5cqE/s-l1200.jpg" },
  ]

  const images = [
    { img: "https://cdn.dribbble.com/users/1072089/screenshots/14186832/ecommerce-dribble-shot_4x.jpg" },
    { img: "https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg" },
    { img: "https://graphicsfamily.com/wp-content/uploads/edd/2022/06/Free-E-commerce-Product-Banner-Design-with-Green-Colors-scaled.jpg" },
  ]

 



  return (
    <SafeAreaView style={{ paddingTop: Platform === "android" ? 40 : 0, flex: 1, backgroundColor: "white" }}>
      <ScrollView>

        <Header />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => {
            return <Pressable key={index} style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: item?.image }} />
              <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500", marginTop: 5 }}>{item?.name}</Text>
            </Pressable>
          })}
        </ScrollView>

        <ImageSlider style={{ width: width }}
          data={images}
          autoPlay={true}
          // onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
          caroselImageStyle={{ resizeMode: 'cover', height: 250 }}
          previewImageStyle={{ width: width }}
          previewImageContainerStyle={{ width: width }}

        />

        <View style={{ marginHorizontal: 10, width: "45%", marginBottom: open ? 50 : 15, marginTop: 20 }}>
          <DropDownPicker style={{ borderColor: "#878787", height: 20, marginBottom: open ? 50 : 15 }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Select a category"

          />
        </View>

        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bolder", marginVertical: 20 }}> DEALS</Text>

        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {

            offers.map((product, index) => {
              return (

                  <ProductItem key={index} product={product} />

              )
            })
          }

            </ScrollView>

        </View>

        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
          {
            category ? (products?.filter(x => x.category === category)).map((product, index) => {
              return (
                <ProductItem key={index} product={product} />
              )
            }) :
              products?.map((product, index) => {
                return (

                  <ProductItem key={index} product={product} />
                )
              })
          }
        </View>
      </ScrollView>



    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})