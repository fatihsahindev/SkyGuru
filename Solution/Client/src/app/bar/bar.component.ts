import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  bar: number[] = [1, 2, 3, 4, 5, 6, 7];
  fill: number = 50;

  constructor() {}

  ngOnInit(): void {}
}
