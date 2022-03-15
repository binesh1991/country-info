import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import DataLoader from "../data/DataLoader";

type authScreenProp = StackNavigationProp<"Auth">;

function InitScreen() {
  const navigation = useNavigation<authScreenProp>();

  useEffect(() => {
    const initData = async () => {
      await DataLoader.loadData();
    };

    initData();

    setTimeout(() => navigation.navigate("CountriesScreen"), 1000);
  });

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Text style={styles.text}>Loading data...</Text>
      <Text style={styles.text}>Please wait.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default InitScreen;
