import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs';
import { WeatherCity } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  key = 'X9WS5KH29NJSFBJ6A4QCTSJZL';
  mainUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

  getData(loc: string){
    return this._http.get<WeatherCity>(this.mainUrl + loc + '?key=' + this.key).pipe(
      map(res => res));
  }
}