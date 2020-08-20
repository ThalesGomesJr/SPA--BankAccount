import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUrlGuard } from '../auth/auth.urlguard';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

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
  validationDeposit(){
    this.depositForm = this.fb.group({
      value : ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  confirmDeposit(){
    if (this.depositForm.valid){
      const valueDeposit = Number(this.depositForm.get('value').value);
      this.user.balance = valueDeposit;
      this.userService.deposit(this.user).subscribe(
        () => {
          this.router.navigate(['home']);
          this.toastr.success('Depósito Realizado com Sucesso');
        }, () => {
          this.toastr.error('O Sistema Falhou, tente novamente mais tarde');
        }
      );
    }
  }

}
