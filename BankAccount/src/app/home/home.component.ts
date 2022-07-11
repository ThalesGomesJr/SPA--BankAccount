import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = new User();
  userId: string;
  balance: string;

  constructor(private userService: UserService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getIdUser();
  }

  // tslint:disable-next-line: typedef
  getIdUser(){
    const name = this.userName();
    this.userService.getUserByName(name).subscribe((user: User) => {
      this.user = Object.assign({}, user);
      this.userId = CryptoJS.AES.encrypt(this.user.id.toString(), 'secretId').toString();
      this.balance = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.user.balance);
    });
  }

  // tslint:disable-next-line: typedef
  userName() {
    return sessionStorage.getItem('username');
  }

}
