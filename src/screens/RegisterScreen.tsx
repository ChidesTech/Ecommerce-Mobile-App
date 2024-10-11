import {
    StyleSheet, Text, View, TextInput, Pressable, Dimensions, Image, SafeAreaView,
    KeyboardAvoidingView, Alert
} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import axios from 'axios';


const { height, width } = Dimensions.get("window");
const RegisterScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        axios.post("http://192.168.177.221:3000/api/users/register", { email,name, password }).then(
            response => {
                Alert.alert("Registration Successful");
                navigation.navigate("Login");
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
                <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: "bold", textAlign: "center" }}>Register Into Your Account</Text>
                <View style={{ marginTop: 40, gap: 30 }}>
                    <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.textInput} placeholder="Enter Email Address" />
                    <TextInput value={name} onChangeText={text => setName(text)} style={styles.textInput} placeholder="Enter Username" />
                    <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.textInput} placeholder="Enter password" />
                </View>
                <View style={{ marginTop: 70 }}>
                    <Pressable onPress={handleRegister} style={{
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
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Register</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={{ fontSize: 16, marginTop: 10, fontWeight: "bold", textAlign: "center" }}> Already have an account? Login Here </Text>
                    </Pressable>

                </View>



            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default RegisterScreen

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