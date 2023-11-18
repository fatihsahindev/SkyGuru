import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../providers/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  subscribes: Subscription[] = [];
  weatherForecast: any;
  weatherIcon: string | undefined;
  // weatherCode!: number;

  unit: { type: string; selected: boolean }[] = [
    { type: 'Celcius', selected: true },
    { type: 'Fahrenheit', selected: false },
  ];

  // info = {
  //   temperature: '12',
  //   location: 'Harrisonburg',
  //   date: this.getDate(),
  //   weather: 'Rainy',
  // };

  detail = {
    cloudy: 86,
    humidity: 68,
    wind: 9,
    weather: 7,
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDate();
    this.getWeatherForecast();
  }

  toggleSelection(unit: { type: string; selected: boolean }): void {
    this.unit.forEach((unit) => (unit.selected = false));
    unit.selected = true;
  }

  getDate() {
    let date;
    let options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    date = new Date().toLocaleString('en-US', options);
    return date;
  }

  getWeatherForecast() {
    this.subscribes.push(
      this.weatherService.getWeatherForecast('Bursa').subscribe(
        (res) => {
          this.weatherForecast = res;
          this.getWeatherStatus(res.weathercode);
          // console.log(this.weatherForecast);
        },
        (err) => {
          console.error('Weather Service Error: ', err);
        }
      )
    );
  }

  getTemp(temp: number) {
    return Math.floor(temp);
  }

  getWeatherStatus(weatherCode: number) {
    switch (weatherCode) {
      case 0:
        this.weatherIcon = 'sun';
        break;
      case 1:
        this.weatherIcon = 'cloud';
        break;
      case 2:
        this.weatherIcon = 'cloud';
        break;
      case 3:
        this.weatherIcon = 'cloud';
        break;
      case 45:
        this.weatherIcon = 'cloud-drizzle';
        break;
      case 48:
        this.weatherIcon = 'cloud-drizzle';
        break;
      case 51:
        this.weatherIcon = 'cloud-drizzle';
        break;
      case 53:
        this.weatherIcon = 'cloud-drizzle';
        break;
      case 55:
        this.weatherIcon = 'cloud-drizzle';
        break;
      case 56:
        this.weatherIcon = 'cloud-rain';
        break;
      case 57:
        this.weatherIcon = 'cloud-rain';
        break;
      case 61:
        this.weatherIcon = 'cloud-rain';
        break;
      case 63:
        this.weatherIcon = 'cloud-rain';
        break;
      case 65:
        this.weatherIcon = 'cloud-rain';
        break;
      case 66:
        this.weatherIcon = 'cloud-rain';
        break;
      case 67:
        this.weatherIcon = 'cloud-rain';
        break;
      case 71:
        this.weatherIcon = 'cloud-snow';
        break;
      case 73:
        this.weatherIcon = 'cloud-snow';
        break;
      case 75:
        this.weatherIcon = 'cloud-snow';
        break;
      case 77:
        this.weatherIcon = 'cloud-snow';
        break;
      case 80:
        this.weatherIcon = 'cloud-rain';
        break;
      case 81:
        this.weatherIcon = 'cloud-rain';
        break;
      case 82:
        this.weatherIcon = 'cloud-rain';
        break;
      case 85:
        this.weatherIcon = 'cloud-snow';
        break;
      case 86:
        this.weatherIcon = 'cloud-snow';
        break;
      case 95:
        this.weatherIcon = 'wind';
        break;
      case 96:
        this.weatherIcon = 'cloud-lightning';
        break;
      case 99:
        this.weatherIcon = 'cloud-lightning';
        break;
      default:
        break;
    }
  }
}
