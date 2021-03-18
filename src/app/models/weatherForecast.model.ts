import { FiveDayForecast } from './fiveDayForecast.model';

export class WeatherForecast {
  //Details array of type FiveDayForecast class.
  public forecast: Array<FiveDayForecast> = new Array<FiveDayForecast>();
  public cityName: string;
}
