import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  unit: { type: string; selected: boolean }[] = [
    { type: 'Celcius', selected: true },
    { type: 'Fahrenheit', selected: false },
  ];
  info = {
    temperature: '12',
    location: 'Harrisonburg',
    date: 'Wednesday 5:00 PM',
    weather: 'Rainy',
  };
  detail = {
    cloudy: 86,
    humidity: 68,
    wind: 9,
    weather: 7,
  };
  constructor() {}
  ngOnInit(): void {}
  toggleSelection(unit: { type: string; selected: boolean }): void {
    this.unit.forEach((unit) => (unit.selected = false));
    unit.selected = true;
  }
}