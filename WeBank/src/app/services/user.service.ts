import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  baseURL = 'http://localhost:5000/api/user';


  constructor(private http: HttpClient) { }

  getUserByName(name: string): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/name/${name}`);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  // tslint:disable-next-line: typedef
  deleteUser(id: number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // tslint:disable-next-line: typedef
  updateUser(user: User){
    return this.http.put(`${this.baseURL}/${user.id}`, user);
  }

  // tslint:disable-next-line: typedef
  updatePassword(user: User){
    return this.http.put(`${this.baseURL}/updatepassword/${user.id}`, user);
  }

  /*getEventoByTema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }*/


}
