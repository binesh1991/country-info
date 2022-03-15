export default class Country {
  public name: string;
  public capital: string;
  public population: number;
  public currency: string;
  public region: string;
  public subregion: string;
  public imageUri: string;

  constructor(varName: string) {
    this.name = varName;
    this.capital = "";
    this.population = 0;
    this.currency = "";
    this.region = "";
    this.subregion = "";
    this.imageUri = "https://reactnative.dev/img/tiny_logo.png";
  }
}
