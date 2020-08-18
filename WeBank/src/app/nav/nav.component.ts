import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private toastr: ToastrService, private authService: AuthService, public router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

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
    this.toastr.error('Você não está mais Logado');
    this.router.navigate(['/user/login']);
  }

  // tslint:disable-next-line: typedef
  userName() {
    return sessionStorage.getItem('username');
  }

}
