import { View, Text, Pressable, TextInput} from 'react-native'
import React from 'react'
import FeatherIcon from "react-native-vector-icons/Feather";


const Header = () => {
  return (
    <View style={{ backgroundColor: "orangered", padding: 10, flexDirection: "row", alignItems: "center" }}>
          <Pressable style={{
            flexDirection: "row", alignItems: "center", marginHonrizontal: 6, gap: 10, backgroundColor: "white",
            borderRadius: 4, height: 40, flex: 1
          }}>
            <FeatherIcon name="search" size={24} color="black" style={{ paddingLeft: 10 }} />
            <TextInput placeholder="Search for product" />
          </Pressable>
          <FeatherIcon name="mic" size={24} color="black" style={{ paddingLeft: 10 }} />

        </View>
  )
}

export default Header