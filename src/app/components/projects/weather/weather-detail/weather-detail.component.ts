import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
  providers: [DatePipe],
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe,
    AngularSvgIconModule,
    DecimalPipe,
    NgClass
  ],
})
export class WeatherDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute, private datePipe: DatePipe){}
  
  loading: boolean = false;
  private _api = inject(WeatherService);
  private _city = this.route.snapshot.paramMap.get('city') || '';
  city$ = this._api.getData(this._city);
  hourArr: number[] = [];
  convertF2C(f: number){
    return Math.floor((f - 32) * 5 / 9);
  }
  ngOnInit(): void {
    let currentHour: any = this.datePipe.transform(new Date(), 'H');
    const hours = [parseInt(currentHour)];
    console.log(currentHour);
    for(let i = 1; i < 10; i++){
      let h: number = currentHour == 24 ? 0 : currentHour + i > 24 ? i - 1 : parseInt(currentHour) + i;
      hours.push(h);
    }
    this.hourArr = hours;
    console.log(this.hourArr);
  }
}
