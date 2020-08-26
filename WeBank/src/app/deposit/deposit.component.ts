import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import * as CryptoJS from 'crypto-js';

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
              private fb: FormBuilder, private acRoute: ActivatedRoute , private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getUser();
    this.validationDeposit();
  }

  // tslint:disable-next-line: typedef
  getUser(){
    const cryptoId = this.acRoute.snapshot.paramMap.get('id');
    this.userId =  Number(CryptoJS.AES.decrypt(cryptoId, 'secretId').toString(CryptoJS.enc.Utf8));
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.user = Object.assign({}, user);
    });
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
      this.user.balance = Number(this.depositForm.get('value').value);
      this.userService.deposit(this.user).subscribe(
        () => {
          this.depositForm.reset();
          this.toastr.success('Depósito Realizado com Sucesso');
        }, () => {
          this.toastr.error('O Sistema Falhou, tente novamente mais tarde');
        }
      );
    }
  }

}
