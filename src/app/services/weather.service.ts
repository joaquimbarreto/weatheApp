import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpErrorHandler,
  HandleError,
} from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherUrl: string;

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('WeatherService');
  }

  /** GET weather from the server */
  getWeather(city: string): Observable<any> {
    this.weatherUrl =
      `https://api.openweathermap.org/data/2.5/forecast?id=` +
      city +
      `&units=metric&appid=cffbc58baf1f22a6ad934dd033b75d92`;
    return this.http
      .get(this.weatherUrl)
      .pipe(catchError(this.handleError('getHeroes', [])));
  }
}
