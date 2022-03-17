export default class Country {
  public name: string;
  public capital: string;
  public population: number;
  public currency: string;
  public region: string;
  public subregion: string;
  public imageUri: string;
  public currencyRate: number;
  public convertedAmount: number | undefined;

  constructor(
    varName: string,
    varCapital: string,
    varPopulation: number,
    varCurrency: string,
    varRegion: string,
    varSubregion: string,
    varImageUri: string,
    varCurrencyRate: number
  ) {
    this.name = varName;
    this.capital = varCapital;
    this.population = varPopulation;
    this.currency = varCurrency;
    this.region = varRegion;
    this.subregion = varSubregion;
    this.imageUri = varImageUri;
    this.currencyRate = varCurrencyRate;
  }
}
