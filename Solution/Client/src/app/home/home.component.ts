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
  weatherView: string | undefined;
  weatherStatus: string | undefined;
  location: string = 'Chicago';
  selectedLocation: string = 'Chicago';

  unit: { type: string; selected: boolean }[] = [
    { type: 'Celcius', selected: true },
    { type: 'Fahrenheit', selected: false },
  ];

  selectedUnit = this.unit[0];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherForecast(this.location);
  }

  toggleSelection(unit: { type: string; selected: boolean }): void {
    this.unit.forEach((unit) => (unit.selected = false));
    unit.selected = true;
    this.selectedUnit = unit;
  }

  getDate(date: Date | string) {
    let options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    date = new Date().toLocaleString('en-US', options);
    return date;
  }

  getWeatherForecast(location: string) {
    this.subscribes.push(
      this.weatherService.getWeatherForecast(location).subscribe(
        (res) => {
          this.weatherForecast = res;
          this.location = this.selectedLocation;
          this.location = this.capitalizeFirstLetter(this.location);
          this.getWeatherStatus(res.weathercode);
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

  celsiusToFahrenheit(celsius: number): number {
    return Math.floor((celsius * 9) / 5 + 32);
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getWeatherStatus(weatherCode: number) {
    switch (weatherCode) {
      case 0:
        this.weatherView = 'sun';
        this.weatherStatus = 'Clear Sky';
        break;
      case 1:
      case 2:
      case 3:
        this.weatherView = 'cloud';
        this.weatherStatus = 'Mainly clear, partly cloudy and overcast';
        break;
      case 45:
      case 48:
        this.weatherView = 'drizzle';
        this.weatherStatus = 'Fog and depositing rime fog';
        break;
      case 51:
      case 53:
      case 55:
        this.weatherView = 'drizzle';
        this.weatherStatus = 'Drizzle | Light, moderate and dense intensity';
        break;
      case 56:
      case 57:
        this.weatherView = 'rain';
        this.weatherStatus = 'Freezing Drizzle | Light and dense intensity';
        break;
      case 61:
      case 63:
      case 65:
        this.weatherView = 'rain';
        this.weatherStatus = 'Rain | Slight, moderate and heavy intensity';
        break;
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        this.weatherView = 'rain';
        this.weatherStatus = 'Freezing Rain | Light and heavy intensity';
        break;
      case 71:
      case 73:
      case 75:
        this.weatherView = 'snow';
        this.weatherStatus = 'Snow Fall | Slight, moderate and heavy intensity';
        break;
      case 77:
        this.weatherView = 'snow';
        this.weatherStatus = 'Snow Grains';
        break;
      case 80:
      case 81:
      case 82:
        this.weatherView = 'rain';
        this.weatherStatus = 'Rain Showers | Slight, moderate and violent';
        break;
      case 85:
      case 86:
        this.weatherView = 'snow';
        this.weatherStatus = 'Snow showers slight and heavy';
        break;
      case 95:
        this.weatherView = 'wind';
        this.weatherStatus = 'Thunderstorm | Slight or moderate';
        break;
      case 96:
      case 99:
        this.weatherView = 'lightning';
        this.weatherStatus = 'Thunderstorm with slight and heavy hail';
        break;
      default:
        break;
    }
  }

  getView(view: string) {
    switch (view) {
      case 'bg': {
        return `background-image: url('../../assets/img/${this.weatherView}.jpg');`;
      }
      case 'icon': {
        return `../../assets/svg/${this.weatherView}.svg`;
      }
      default: {
        return '';
      }
    }
  }
}
