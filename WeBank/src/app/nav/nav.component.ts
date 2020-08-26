import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user = new User();
  userId: string;

  constructor(private toastr: ToastrService, private authService: AuthService,
              private userService: UserService, public router: Router) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {}

  // tslint:disable-next-line: typedef
  showMenu(){
    return this.router.url !== '/user/login';
  }

  // tslint:disable-next-line: typedef
  loginNav(){
    this.router.navigate(['/user/login']);
  }

  // tslint:disable-next-line: typedef
  loggedIn(){
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  logout(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('username');
    // tslint:disable-next-line: deprecation
    location.reload(true);
    this.toastr.error('Você não está mais Logado');
    this.router.navigate(['/user/login']);
  }

  // tslint:disable-next-line: typedef
  getIdUser(){
    const name = this.userName();
    this.userService.getUserByName(name).subscribe((user: User) => {
      this.user = Object.assign({}, user);
      this.userId = CryptoJS.AES.encrypt(this.user.id.toString(), 'secretId').toString();
    });
  }

  // tslint:disable-next-line: typedef
  userName() {
    return sessionStorage.getItem('username');
  }

  // tslint:disable-next-line: typedef
  extract(){
    this.getIdUser();
    this.router.navigate(['/balance/extract', this.userId]);
  }

  // tslint:disable-next-line: typedef
  savedBalance(){
    this.getIdUser();
    this.router.navigate(['/balance/save', this.userId]);
  }

  // tslint:disable-next-line: typedef
  deposit(){
    this.getIdUser();
    this.router.navigate(['/deposit', this.userId]);
  }

  // tslint:disable-next-line: typedef
  transfer(){
    this.getIdUser();
    this.router.navigate(['/transfer', this.userId]);
  }

  // tslint:disable-next-line: typedef
  profile(){
    this.getIdUser();
    this.router.navigate(['/profile', this.userId]);
  }

}
