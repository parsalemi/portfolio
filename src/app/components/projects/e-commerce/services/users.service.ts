import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserLogin, UserDTO, UserRegister, UserRegisterDTO, UserUpdate } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.api_url;
  constructor(private _http: HttpClient) { }

  signInUser(user: UserLogin): Observable<User>{
    return this._http.post<UserDTO>(`${this.baseUrl}/users/signin`, user).pipe(map(res => res.data))
  }
  registerUser(user: UserRegister): Observable<User>{
    return this._http.post<UserRegisterDTO>(`${this.baseUrl}/users/register`, user).pipe(map(res => res.data));
  }

  getUserData(id: number): Observable<User> {
    return this._http.get<UserDTO>(`${this.baseUrl}/users/${id}`).pipe(map(res => res.data))
  }
  updateUser(id: number, body: UserUpdate) {
    return this._http.put(`${this.baseUrl}/users/${id}`, body);
  }
  deleteUser(id: number, password: string){
    return this._http.post(`${this.baseUrl}/users/${id}/delete`, {password});
  }
}
