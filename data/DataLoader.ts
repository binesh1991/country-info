import AsyncStorage from "@react-native-async-storage/async-storage";

export default class DataLoader {
  static loadData = async () => {
    await this.getAllCountries();
    await this.getCurrencyRates();
  };

  private static getAllCountries = async () => {
    await this.getJsonData("https://restcountries.com/v3.1/all", "countries");
  };

  private static getCurrencyRates = async () => {
    await this.getJsonData(
      "http://data.fixer.io/api/latest?access_key=a4c724a9a24a46ea3e4b87de13fa2598",
      "currencyRates"
    );
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
