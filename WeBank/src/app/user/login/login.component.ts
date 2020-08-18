import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService, public router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    if (localStorage.getItem('token') !== null){
      this.router.navigate(['/home']);
    }
  }

  // tslint:disable-next-line: typedef
  login(){
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['/home']);
        this.toastr.success('Olá, Seja Bem-Vindo');
      }, error => {
        this.toastr.error('Erro no Login');
      }
    );
  }
}

