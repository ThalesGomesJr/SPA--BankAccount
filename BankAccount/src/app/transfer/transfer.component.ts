import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  user = new User();
  userId: number;
  transferForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService,
              private fb: FormBuilder, private acRoute: ActivatedRoute , private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getUser();
    this.validationTransfer();
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
  validationTransfer(){
    this.transferForm = this.fb.group({
      numAccount : ['', Validators.required],
      value : ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  confirmTransfer(){
    if (this.transferForm.valid){
      const numAccount = this.transferForm.get('numAccount').value;
      this.userService.getUserByNumAccount(numAccount).subscribe(
        () => {
          this.user.balance = Number(this.transferForm.get('value').value);
          this.userService.transfer(this.user, numAccount).subscribe(
            () => {
              this.transferForm.reset();
              this.toastr.success('Transferência Realizada com Sucesso');
            }, () => {
              this.toastr.error('O Sistema Falhou, tente novamente mais tarde');
            }
          );
        }, () => {
          this.toastr.error('Número da Conta é Inválido');
        }
      );
    }
  }

}
