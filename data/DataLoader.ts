import AsyncStorage from "@react-native-async-storage/async-storage";

export default class DataLoader {
  static loadData = async () => {
    await this.getAllCountries();
    await this.getCurrencyRates();
  };

  private static getAllCountries = async () => {
    await this.getJsonData("https://restcountries.com/v3.1/all", "countries");
  };

  static getCountriesByPartialName = async (input: string) => {
    if (input.length > 0) {
      await this.getJsonData(
        "https://restcountries.com/v3.1/name/" + input,
        "countries"
      );
    } else {
      this.getAllCountries();
    }
  };

  private static getCurrencyRates = async () => {
    await this.getJsonData("http://data.fixer.io/api/", "currencyRates");
  };

  private static getJsonData = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const responseValue = await response.json();
      const jsonString = JSON.stringify(responseValue);
      await AsyncStorage.setItem(name, jsonString);
    } catch (error) {
      console.error(error);
    }
  };
}
