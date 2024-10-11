import {
    StyleSheet, Text, View, TextInput, Pressable, Dimensions, Image, SafeAreaView,
    KeyboardAvoidingView, Alert
} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react'
import axios from '../../node_modules/axios/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get("window");
const LoginScreen = () => {
    const navigation = useNavigation()


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   useEffect(() => {
     const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
     if(token){
        navigation.replace("Main")
     }
        } catch (error) {
            console.log("Error", error);
        }
     }

     checkLoginStatus();
   },[])

    const handleLogin = () => {

        
         axios.post("http://192.168.245.221:3000/api/users/login", { email, password })
        .then(
            response => {
                Alert.alert("Login Successful");
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);

                navigation.replace("Main");
            }
        ).catch(error => {
            Alert.alert("Login Error")
            console.log(error)
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}>
            <View>
                <Image style={{ height: 120, width: 120 }} source={{ uri: "https://img.freepik.com/premium-vector/digital-shopping-logo-template-design-vector-emblem-design-concept-creative-symbol-icon_316488-2430.jpg" }} />

            </View>
            <KeyboardAvoidingView >
                <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: "bold", textAlign: "center" }}>Login Into Your Account</Text>
                <View style={{ marginTop: 40, gap: 30 }}>
                    <TextInput value={email} onChangeText={(text : string)=> setEmail(text)} style={styles.textInput} placeholder="Enter Email Address" />
                    <TextInput value={password} onChangeText={(text : string) => setPassword(text)} style={styles.textInput} placeholder="Enter Password" />
                </View>

                <Text style={{ fontSize: 16, marginTop: 10, fontWeight: "bold", color: "steelblue" }}>Forgot Password</Text>
                <View style={{ marginTop: 70 }}>
                    <Pressable onPress={handleLogin} style={{
                        backgroundColor: "orangered",
                        borderRadius: 10,
                        padding: 15,
                        width: 0.8 * width,
                        fontSize: 17,
                        alignItems: "center",
                        fontWeight: "bold",
                        marginLeft: "auto",
                        marginRight: "auto",

                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Login</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <Text style={{ fontSize: 16, marginTop: 10, fontWeight: "bold", textAlign: "center" }}> Don't have an account? Register Here </Text>
                    </Pressable>

                </View>



            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        height: 50,
        paddingLeft: 20,
        width: 0.9 * width,
        borderColor: "grey",
        borderWidth: 1,
        fontSize: 16
    }
})