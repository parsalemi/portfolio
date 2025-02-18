import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserLogin, UserDTO, UserRegister, UserRegisterDTO, UserUpdate } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'http://localhost:8000/api/users/';
  constructor(private _http: HttpClient) { }

  signInUser(user: UserLogin): Observable<User>{
    return this._http.post<UserDTO>(this.baseUrl + 'signin', user).pipe(map(res => res.data))
  }
  registerUser(user: UserRegister): Observable<User>{
    return this._http.post<UserRegisterDTO>(this.baseUrl + 'register', user).pipe(map(res => res.data));
  }

  getUserData(id: number): Observable<User> {
    return this._http.get<UserDTO>(this.baseUrl + id).pipe(map(res => res.data))
  }
  updateUser(id: number, body: UserUpdate) {
    return this._http.put(this.baseUrl + id, body);
  }
  deleteUser(id: number){
    return this._http.delete(this.baseUrl + id);
  }
}
