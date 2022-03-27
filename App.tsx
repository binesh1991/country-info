import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitScreen from "./components/InitScreen";
import CountriesScreen from "./components/CountriesScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="InitScreen"
          component={InitScreen}
          options={{
            title: "Initializing",
            headerStyle: {
              backgroundColor: "#0b4fb5",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="CountriesScreen"
          component={CountriesScreen}
          options={({ navigation }) => ({
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
