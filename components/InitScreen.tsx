import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import DataLoader from "../data/DataLoader";

type countriesScreenProp = StackNavigationProp<"Countries">;

function InitScreen() {
  const navigation = useNavigation<countriesScreenProp>();

  useEffect(() => {
    const initData = async () => {
      await DataLoader.loadData();
    };

    initData().then(() => navigation.navigate("CountriesScreen"));
  });

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
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

export default InitScreen;
