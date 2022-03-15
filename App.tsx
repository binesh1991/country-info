import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitScreen from "./components/InitScreen";
import CountriesScreen from "./components/CountriesScreen";
import React from "react";
import { Button } from "react-native";
import Dialog from "react-native-dialog";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InitScreen" component={InitScreen} />
        <Stack.Screen
          name="CountriesScreen"
          component={CountriesScreen}
          options={{
            title: "Countries",
            headerBackVisible: false,
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="SEK"
                color="#32a852"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
