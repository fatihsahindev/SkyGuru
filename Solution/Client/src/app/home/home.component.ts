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

  unit: { type: string; selected: boolean }[] = [
    { type: 'Celcius', selected: true },
    { type: 'Fahrenheit', selected: false },
  ];

  detail = {
    cloudy: 86,
    humidity: 68,
    wind: 9,
    weather: 7,
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherForecast();
  }

  toggleSelection(unit: { type: string; selected: boolean }): void {
    this.unit.forEach((unit) => (unit.selected = false));
    unit.selected = true;
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
        this.weatherView = 'sun';
        break;
      case 1:
        this.weatherView = 'cloud';
        break;
      case 2:
        this.weatherView = 'cloud';
        break;
      case 3:
        this.weatherView = 'cloud';
        break;
      case 45:
        this.weatherView = 'drizzle';
        break;
      case 48:
        this.weatherView = 'drizzle';
        break;
      case 51:
        this.weatherView = 'drizzle';
        break;
      case 53:
        this.weatherView = 'drizzle';
        break;
      case 55:
        this.weatherView = 'drizzle';
        break;
      case 56:
        this.weatherView = 'rain';
        break;
      case 57:
        this.weatherView = 'rain';
        break;
      case 61:
        this.weatherView = 'rain';
        break;
      case 63:
        this.weatherView = 'rain';
        break;
      case 65:
        this.weatherView = 'rain';
        break;
      case 66:
        this.weatherView = 'rain';
        break;
      case 67:
        this.weatherView = 'rain';
        break;
      case 71:
        this.weatherView = 'snow';
        break;
      case 73:
        this.weatherView = 'snow';
        break;
      case 75:
        this.weatherView = 'snow';
        break;
      case 77:
        this.weatherView = 'snow';
        break;
      case 80:
        this.weatherView = 'rain';
        break;
      case 81:
        this.weatherView = 'rain';
        break;
      case 82:
        this.weatherView = 'rain';
        break;
      case 85:
        this.weatherView = 'snow';
        break;
      case 86:
        this.weatherView = 'snow';
        break;
      case 95:
        this.weatherView = 'wind';
        break;
      case 96:
        this.weatherView = 'lightning';
        break;
      case 99:
        this.weatherView = 'lightning';
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
