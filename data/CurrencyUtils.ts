export default class CurrencyUtils {
  static convertSekToLocal(amount: number, sekRate: number, currRate: number) {
    let calc = (currRate / sekRate) * amount;
    return Math.round(calc * 100) / 100;
  }
}
