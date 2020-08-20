import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthUrlGuard } from '../auth/auth.urlguard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: number;
  user = new User();
  depositForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService,
              private fb: FormBuilder, private urlGuard: AuthUrlGuard, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.userId = this.urlGuard.getToProfile();
    this.getUser();
    this.validationDeposit();
  }

  // tslint:disable-next-line: typedef
  getUser(){
    if (this.userId){
      this.userService.getUserById(this.userId).subscribe((user: User) => {
        this.user = Object.assign({}, user);
        });
    }
    else{
      const name = sessionStorage.getItem('username');
      this.userService.getUserByName(name).subscribe((user: User) => {
        this.user = Object.assign({}, user);
      });
    }
  }

  // tslint:disable-next-line: typedef
  openDeposit(template: any){
    this.openModal(template);
  }

  // tslint:disable-next-line: typedef
  validationDeposit(){
    this.depositForm = this.fb.group({
      value : ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  confirmDeposit(template: any){
    if (this.depositForm.valid){
      const valueDeposit = this.depositForm.get('value');
      this.user.balance = Number(valueDeposit.value);
      this.userService.deposit(this.user).subscribe(
        () => {
          template.hide();
          this.toastr.success('Depósito Realizado com Sucesso');
        }, () => {
          this.toastr.error('Erro tentar Realizar Depósito');
        }
      );
    }
  }

  // tslint:disable-next-line: typedef
  openModal(template: any){
    this.depositForm.reset();
    template.show();
  }


}
