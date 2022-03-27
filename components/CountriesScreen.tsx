import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Text,
  TextInput,
  Dimensions,
  BackHandler,
} from "react-native";
import { SearchBar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Country from "../model/Country";
import CurrencyUtils from "../data/CurrencyUtils";
import ListComponent from "../components/ListComponent";

function CountriesScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currencyInput, setCurrencyInput] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [sekRate, setSekRate] = useState<number>(1);

  const dismissModal = () => {
    setModalVisible(false);
  };

  const performConversion = () => {
    dismissModal();
    convertCurrency();
  };

  const { width } = Dimensions.get("window");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => setModalVisible(true)}
          title="SEK"
          color="#32a852"
        />
      ),
    });
  }, [navigation]);

  const convertCurrency = () => {
    data.forEach((element) => {
      if (element.currency != null) {
        let amount = CurrencyUtils.convertSekToLocal(
          parseInt(currencyInput),
          sekRate,
          element.currencyRate
        );
        element.convertedAmount = amount;
      }
    });

    setData(data);
  };

  const getData = async () => {
    console.log("getData");
    try {
      let value: string | null = null;

      if (data.length == 0 && search.length == 0) {
        value = await AsyncStorage.getItem("countries");
      }

      if (value != null) {
        let jsonData = JSON.parse(value);

        let rates = await AsyncStorage.getItem("currencyRates");
        let ratesJson: { rates: { [x: string]: number } } | null = null;

        if (rates != null) {
          ratesJson = JSON.parse(rates);
        }

        if (
          jsonData != null &&
          ratesJson?.rates != null &&
          jsonData.length > 0
        ) {
          setSekRate(ratesJson.rates.SEK);

          let countries: Country[] = [];

          jsonData.forEach((element: any) => {
            let currency = null;
            let currencyRate = 1;

            if (element.currencies != null) {
              currency = Object.keys(element.currencies)[0];
            }

            if (currency != null && ratesJson != null) {
              currencyRate = ratesJson.rates[currency];
            }

            countries.push(
              new Country(
                element.name.official,
                element.capital,
                element.population,
                currency ?? "",
                element.region,
                element.subregion,
                element.flags.png,
                currencyRate
              )
            );
          });

          setData(countries);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateSearch = async (input: string) => {
    setSearch(input);
    let results = data.filter((c) => c.name.includes(input));
    setData(results);
  };

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  BackHandler.addEventListener("hardwareBackPress", handleBackButton);

  useEffect(() => {
    getData();
  }, [currencyInput]);

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
      transform: [{ translateX: -(width * 0.4) }, { translateY: -80 }],
      height: 160,
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
        animationType="fade"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={dismissModal}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 16 }}>
              Amount in SEK to convert to local currencies
            </Text>
            <TextInput
              placeholder="Enter amount"
              value={currencyInput}
              style={styles.textInput}
              onChangeText={(value) => setCurrencyInput(value)}
            />
            <Button title="Convert" onPress={performConversion} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CountriesScreen;
