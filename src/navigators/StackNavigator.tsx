import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntIcon from 'react-native-vector-icons/AntDesign'
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();


    const BottomTabs = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarLabel: "Home", tabBarLabelStyle: { color: "orangered" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (<EntypoIcon name="home" color="orangered" size={24} />) :
                            (<AntIcon name="home" size={24} />)

                    }}
                />
                <Tab.Screen name="Cart" component={CartScreen}
                    options={{
                        tabBarLabel: "Cart", tabBarLabelStyle: { color: "orangered" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (<EntypoIcon color="orangered" name="shopping-cart" size={24} />) :
                            (<AntIcon name="shoppingcart" size={24} />)

                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile", tabBarLabelStyle: { color: "orangered" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (<EntypoIcon name="user" color="orangered" size={24} />) :
                            (<AntIcon name="user" size={24} />)

                    }}
                />

            </Tab.Navigator>
        )

    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})