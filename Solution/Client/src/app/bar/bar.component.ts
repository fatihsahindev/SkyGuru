import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../providers/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() location: string | undefined;
  subscribes: Subscription[] = [];
  bar: number[] = [1, 2, 3, 4, 5, 6, 7];
  fill: number = 50;
  hourlyWeatherForecast: any;
  dailyTemps: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getHourlyWeatherForecast(this.location!);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && !changes['location'].firstChange) {
      this.getHourlyWeatherForecast(this.location!);
    }
  }

  getHourlyWeatherForecast(location: string) {
    this.dailyTemps = [];
    this.subscribes.push(
      this.weatherService.GetHourlyWeather(location).subscribe(
        (res) => {
          this.hourlyWeatherForecast = res;
          this.dailyTemps = res.temperature_2m.slice(0, 24);
          console.log(this.dailyTemps);
          
        },
        (err) => {
          console.error('Weather Service Error: ', err);
        }
      )
    );
  }

  getHour(j: number) {
    let date = new Date();
    let now = String(date.getHours()).padStart(2, '0');
    return parseInt(now, 10) === (j + 1);
  }
}
