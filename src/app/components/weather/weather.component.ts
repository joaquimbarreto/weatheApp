import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FiveDayForecast } from 'src/app/models/fiveDayForecast.model';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from '../../models/weather.model';
import { WeatherForecast } from '../../models/weatherForecast.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['../../../assets/css/main.css'],
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  currentCity: string = 'roma';
  currentCityBlurb: string;
  currentWeather: Weather;

  forecastTomorrowDay: string;
  forecastTomorrowPlusOneDay: string;
  forecastTomorrowPlusTwoDay: string;
  forecastTomorrowPlusThreeDay: string;
  forecastTomorrowPlusFourDay: string;

  forecastTomorrowWeather: Weather = new Weather();
  forecastTomorrowPlusOneWeather: Weather = new Weather();
  forecastTomorrowPlusTwoWeather: Weather = new Weather();
  forecastTomorrowPlusThreeWeather: Weather = new Weather();
  forecastTomorrowPlusFourWeather: Weather = new Weather();

  weatherForecast: WeatherForecast = new WeatherForecast();
  fiveDayForecast: FiveDayForecast;

  cities = {
    roma: '668737',
    firenze: '6542285',
    milano: '6542283',
    venezia: '6542284',
  };

  citiesBlurb = {
    roma: 'Italy\'s capital. All roads lead to Rome.',
    firenze: 'Lovely place.',
    milano: 'Economic center of Italy.',
    venezia: 'Unimaginable Beauty.',
  };


  
  cityCode: string;

  ngOnInit() {
    this.getWeather(this.currentCity);
  }

  getWeather(city: string): void {
    this.cityCode = this.cities[city];
    this.currentCityBlurb = this.citiesBlurb[city];
    this.weatherService.getWeather(this.cityCode).subscribe((res) => {
      this.weatherForecast = new WeatherForecast(); 
      this.weatherForecast.cityName = res.city.name.toLowerCase();
      this.currentWeather = new Weather();
      this.currentWeather.currentTemperature = res.list[0].main.temp;
      for (
        var i = 7;
        i < res.list.length;
        i = i + 8 //Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
      ) {
        //Instance of type FiveDayForecast and stores the data in it.
        var details = new FiveDayForecast();
        details.date = res.list[i].dt_txt;
        details.maxTemperature = res.list[i].main.temp_max;
        details.minTemperature = res.list[i].main.temp_min;
        details.description = res.list[i].weather[0].description;
        details.icon = res.list[i].weather[0].icon;
        this.weatherForecast.forecast.push(details); //Pushing the data to the to created object
      }

      for (let i = 0; i < this.weatherForecast.forecast.length; i++) {
        if (i === 0) {
          this.forecastTomorrowWeather.description = this.weatherForecast.forecast[
            i
          ].description;
          this.forecastTomorrowWeather.maxTemperature = this.weatherForecast.forecast[
            i
          ].maxTemperature;
          this.forecastTomorrowWeather.minTemperature = this.weatherForecast.forecast[
            i
          ].minTemperature;
          this.forecastTomorrowWeather.icon = this.weatherForecast.forecast[
            i
          ].icon;
        }
        if (i === 1) {
          this.forecastTomorrowPlusOneWeather.description = this.weatherForecast.forecast[
            i
          ].description;
          this.forecastTomorrowPlusOneWeather.maxTemperature = this.weatherForecast.forecast[
            i
          ].maxTemperature;
          this.forecastTomorrowPlusOneWeather.minTemperature = this.weatherForecast.forecast[
            i
          ].minTemperature;
          this.forecastTomorrowPlusOneWeather.icon = this.weatherForecast.forecast[
            i
          ].icon;
        }
        if (i === 2) {
          this.forecastTomorrowPlusTwoWeather.description = this.weatherForecast.forecast[
            i
          ].description;
          this.forecastTomorrowPlusTwoWeather.maxTemperature = this.weatherForecast.forecast[
            i
          ].maxTemperature;
          this.forecastTomorrowPlusTwoWeather.minTemperature = this.weatherForecast.forecast[
            i
          ].minTemperature;
          this.forecastTomorrowPlusTwoWeather.icon = this.weatherForecast.forecast[
            i
          ].icon;
        }
        if (i === 3) {
          this.forecastTomorrowPlusThreeWeather.description = this.weatherForecast.forecast[
            i
          ].description;
          this.forecastTomorrowPlusThreeWeather.maxTemperature = this.weatherForecast.forecast[
            i
          ].maxTemperature;
          this.forecastTomorrowPlusThreeWeather.minTemperature = this.weatherForecast.forecast[
            i
          ].minTemperature;
          this.forecastTomorrowPlusThreeWeather.icon = this.weatherForecast.forecast[
            i
          ].icon;
        }
        if (i === 4) {
          this.forecastTomorrowPlusFourWeather.description = this.weatherForecast.forecast[
            i
          ].description;
          this.forecastTomorrowPlusFourWeather.maxTemperature = this.weatherForecast.forecast[
            i
          ].maxTemperature;
          this.forecastTomorrowPlusFourWeather.minTemperature = this.weatherForecast.forecast[
            i
          ].minTemperature;
          this.forecastTomorrowPlusFourWeather.icon = this.weatherForecast.forecast[
            i
          ].icon;
        }
      }

      this.forecastTomorrowDay = this.weatherForecast.forecast[0].date;
      this.forecastTomorrowPlusOneDay = this.weatherForecast.forecast[1].date;
      this.forecastTomorrowPlusTwoDay = this.weatherForecast.forecast[2].date;
      this.forecastTomorrowPlusThreeDay = this.weatherForecast.forecast[3].date;
      this.forecastTomorrowPlusFourDay = this.weatherForecast.forecast[4].date;
    });
  }

  public setCity(city: string) {
    this.currentCity = city;
    this.getWeather(city);
  }
}
