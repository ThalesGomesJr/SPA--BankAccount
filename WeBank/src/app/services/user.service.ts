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

  // tslint:disable-next-line: typedef
  uploadImage(file: File, name: string){
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, name);
    return this.http.post(`${this.baseURL}/upload`, formData);
  }

  // tslint:disable-next-line: typedef
  deposit(user: User){
    return this.http.post(`${this.baseURL}/deposit/${user.id}`, user);
  }

  // tslint:disable-next-line: typedef
  saveMoney(user: User){
    return this.http.post(`${this.baseURL}/savemoney/${user.id}`, user);
  }

  // tslint:disable-next-line: typedef
  rescueMoney(user: User){
    return this.http.post(`${this.baseURL}/rescuemoney/${user.id}`, user);
  }

  getUserExtractById(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/extract/${id}`);
  }

  getUserByNumAccount(numAccount: string): Observable<User>{
    return this.http.get<User>(`${this.baseURL}/numAccount/${numAccount}`);
  }

  // tslint:disable-next-line: typedef
  transfer(user: User, numAccount: number){
    return this.http.post(`${this.baseURL}/transfer/${user.id}/${numAccount}`, user);
  }

}
