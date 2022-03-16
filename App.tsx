import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitScreen from "./components/InitScreen";
import CountriesScreen from "./components/CountriesScreen";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="InitScreen"
          component={InitScreen}
          options={{
            headerStyle: {
              backgroundColor: "#0b4fb5",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="CountriesScreen"
          component={CountriesScreen}
          options={({ navigation, route }) => ({
            title: "Countries",
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#0b4fb5",
            },
            headerTintColor: "#fff",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
