import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import StackNavigator from "./navigators/StackNavigator";
import store from "./store";
import {Provider} from "react-redux"

function App() {
  return (<>
  <Provider store={store}>

  
    <StackNavigator />
    </Provider>
       </>)

}


export default App;
