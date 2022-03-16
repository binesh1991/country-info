import React, { useState } from "react";
import CurrencyUtils from "../data/CurrencyUtils";
import ListComponent from "../components/ListComponent";
import { View, StyleSheet, BackHandler } from "react-native";
import { SearchBar } from "react-native-elements";
import DataLoader from "../data/DataLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Country from "../model/Country";
import { Button, Modal, TextInput, Dimensions } from "react-native";

function CountriesScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currencyInput, setCurrencyInput] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const performConversion = () => {
    setModalVisible(!isModalVisible);
    convertCurrency();
  };

  const { width } = Dimensions.get("window");

  let countries: Country[] = [];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => toggleModalVisibility()}
          title="SEK"
          color="#32a852"
        />
      ),
    });
  }, [navigation]);

  const convertCurrency = async () => {
    let value = await AsyncStorage.getItem("currencyRates");

    if (value != null) {
      let jsonData = JSON.parse(value);
      let sekRate = jsonData.rates.SEK;

      countries.forEach((element) => {
        let currRate = jsonData.rates[element.currency];
        let amount = CurrencyUtils.convertSekToLocal(
          parseInt(currencyInput),
          sekRate,
          currRate
        );
        element.setConvertedAmount(amount);
      });

      setData(countries);
    }
  };

  const getData = async () => {
    try {
      let value: string | null;

      if (search?.length != undefined && search.length > 0) {
        value = await AsyncStorage.getItem("countriesByPartialName");
      } else {
        value = await AsyncStorage.getItem("countries");
      }

      if (value != null) {
        let jsonData = JSON.parse(value);

        jsonData.forEach((element: any) => {
          let currency = "";

          if (element.currencies != undefined) {
            currency = Object.keys(element.currencies)[0];
          }

          countries.push(
            new Country(
              element.name.official,
              element.capital,
              element.population,
              currency,
              element.region,
              element.subregion,
              element.flags.png
            )
          );
        });

        setData(countries);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  getData();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
      height: 180,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
    },
    textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        platform={"default"}
      />
      <ListComponent countryData={data} />
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter amount..."
              value={currencyInput}
              style={styles.textInput}
              onChangeText={(value) => setCurrencyInput(value)}
            />
            <Button title="Done" onPress={performConversion} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CountriesScreen;
