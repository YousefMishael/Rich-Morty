import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home/Home";
import { NativeBaseProvider } from "native-base";
import Episode from "./Screens/Episode/Episode";
import Character from "./Screens/Character/Character";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Episode" component={Episode} />
          <Stack.Screen name="Character" component={Character} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
