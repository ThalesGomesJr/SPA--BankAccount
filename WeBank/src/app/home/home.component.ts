import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthUrlGuard } from '../auth/auth.urlguard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService, private urlGuard: AuthUrlGuard, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getIdUser();
  }


  // tslint:disable-next-line: typedef
  routeDeposit(){
    this.getIdUser();
    this.urlGuard.setToProfile(this.user.id);
    this.router.navigate(['deposit']);
  }

  // tslint:disable-next-line: typedef
  routeSaveBalance(){
    this.getIdUser();
    this.urlGuard.setToProfile(this.user.id);
    this.router.navigate(['balance/save']);
  }

  // tslint:disable-next-line: typedef
  getIdUser(){
    const name = sessionStorage.getItem('username');
    this.userService.getUserByName(name).subscribe((user: User) => {
      this.user = Object.assign({}, user);
    });
  }

}
