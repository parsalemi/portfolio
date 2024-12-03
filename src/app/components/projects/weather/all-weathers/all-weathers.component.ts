import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherCity } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, LowerCasePipe, NgFor, NgForOf, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-weathers',
  standalone: true,
  templateUrl: './all-weathers.component.html',
  styleUrls: ['./all-weathers.component.scss'],
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
    NgFor,
    NgForOf,
    RouterLink,
    DatePipe,
    NgStyle,
  ],
})
export class AllWeathersComponent {
  todayDate = new Date();

  public _weather$: Observable<WeatherCity>;
  public someWeathers$: Observable<WeatherCity>[] = [];
  
  _api = inject(WeatherService);
  locations: string[] = ['dubai', 'newyork', 'isfahan', 'losangeles', 'shiraz', 'tehran', 'barcelona', 'madrid', 'paris', 'baqdad', 'berlin', 'london'];
  userLocation: string = this.getUserLoc();
  loading: boolean = false;
  constructor(){
    this._weather$ = this._api.getData(this.userLocation);

    for(let i = 0; i < this.locations.length; i++){
      this.someWeathers$.push(this._api.getData(this.locations[i]));
    }
  }
  getUserLoc(): string{
    let lat = 0;
    let lng = 0;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( (pos) => {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      })
    }
    return `${lat},${lng}`
  }
  
  cardBgc(time: string, event: any){
    if(parseInt(time.split(':')[0]) < 12){
      console.log(event);
      event.target.style.backgroundColor = 'black';
    }
  }
  forTime(tz: number): string{
    let text = ''
    if(tz % 1 !== 0 && tz > 0){
      tz = tz - 0.5;
      text = `${tz}:30`;
      return `UTC +` + text;
    }else if(tz % 1 !== 0 && tz < 0){
      tz = tz + 0.5;
      text = `${tz}:30`
      console.log(text);
      return `UTC ` + text
    }else if(tz < 0){
      return `UTC ${tz}`
    }else {
      return `UTC +${tz}`
    }
  }


  ngOnInit(){
    // this.cardBgc('01:00:300',);
    console.log(this.todayDate);
  }
}

