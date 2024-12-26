import { Component, Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherCity } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-weathers',
  standalone: true,
  templateUrl: './all-weathers.component.html',
  styleUrls: ['./all-weathers.component.scss'],
  imports: [
    FormsModule,
    AsyncPipe,
    RouterLink,
    DatePipe,
    NgStyle,
    NgClass,
  ],
})
export class AllWeathersComponent {
  todayDate = new Date();
  public someWeathers$: Observable<WeatherCity>[] = [];
  _api = inject(WeatherService);
  userLocation: string = this.getUserLoc();
  loading: boolean = false;
  locations: string[] = [
    'tehran', 'isfahan', 'shiraz', 'mashhad', 'yazd', 'tabriz', 
    'barcelona', 'dubai', 'newyork', 'losangeles', 'madrid', 'paris',
    'baqdad', 'berlin', 'london', 'liverpool', 'milan', 'moscow'
  ];

  constructor(private _router: Router){
    // for(let i = 0; i < this.locations.length; i++){
    //   this.someWeathers$.push(this._api.getData(this.locations[i]));
    // }
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
  convertF2C(f: number){
    return Math.floor((f - 32) * 5/9);
  }
  searchCity(city: string){
    console.log(city);
    this._router.navigate(['projects/weather/'+city]);
  }
  ngOnInit(){
    // this.cardBgc('01:00:300',);
    console.log(this.todayDate);
  }
}

