import { Injectable } from '@angular/core';

// {providedIn: 'root'}
@Injectable({providedIn: 'root'})
export class AuthUrlGuard {

  private userId: number;

  constructor(){}

  // tslint:disable-next-line: typedef
  setToProfile(userId: number) {
    this.userId = userId;
  }

  // tslint:disable-next-line: typedef
  getToProfile() {
    return this.userId;
  }

}
