import React, { useState, useEffect } from "react";
import CurrencyUtils from "../data/CurrencyUtils";
import ListComponent from "../components/ListComponent";
import { View, Text, StyleSheet, BackHandler, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import DataLoader from "../data/DataLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Country from "../model/Country";

function CountriesScreen() {
  const [data, setData] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>();

  const updateSearch = async (input: string) => {
    setSearch(input);
    await DataLoader.getCountriesByPartialName(input);
    await getData();
  };

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  BackHandler.addEventListener("hardwareBackPress", handleBackButton);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("countries");
      if (value != null) {
        setData(JSON.parse(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  getData();

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        platform={"default"}
      />
      <ListComponent countryData={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CountriesScreen;
