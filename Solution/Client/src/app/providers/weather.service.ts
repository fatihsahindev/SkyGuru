import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    controllerName: string = "Weather";

    constructor(private http: HttpClient) { }

    getWeatherForecast(city: string): Observable<any> {
        return this.http.get<any>(`${environment.api}/${this.controllerName}/GetWeatherForecast?city=${city}`)
    }
}