import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { NavTab, WeatherApiResponse } from './interfaces';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TodayForecastComponent } from './components/today-forecast/today-forecast.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { WeatherTelemetryComponent } from './components/weather-telemetry/weather-telemetry.component';
import { NewsComponent } from './components/news/news.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NavbarComponent,
    SearchBarComponent,
    TodayForecastComponent,
    ForecastListComponent,
    WeatherTelemetryComponent,
    NewsComponent,
    PhotosComponent,
    ContactComponent,
    ChatbotComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public activeTab: NavTab = 'home';
  public weatherData: WeatherApiResponse | null = null;
  public isLoading = false;
  public errorMessage: string | null = null;
  public unit: 'C' | 'F' = 'C';

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe((data) => {
      this.weatherData = data;
    });

    this.weatherService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.weatherService.error$.subscribe((err) => {
      this.errorMessage = err;
    });

    this.weatherService.unit$.subscribe((unit) => {
      this.unit = unit;
    });
  }

  public setTab(tab: NavTab): void {
    this.activeTab = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
