import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [WeatherService, HttpErrorHandler, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
