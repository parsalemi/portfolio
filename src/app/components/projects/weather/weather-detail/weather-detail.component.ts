import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
  imports: [
    NgIf,
    AsyncPipe
  ],
})
export class WeatherDetailComponent {
  loading: boolean = false;
  constructor(private route: ActivatedRoute){}

  private _api = inject(WeatherService);
  public city = this.route.snapshot.paramMap.get('city') || '';
  public city$ = this._api.getData(this.city);
}
