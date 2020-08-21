import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-saveBalance',
  templateUrl: './saveBalance.component.html',
  styleUrls: ['./saveBalance.component.css']
})
export class SaveBalanceComponent implements OnInit {

  userId: number;
  user = new User();
  savedBalance: string;
  saveBalanceForm: FormGroup;
  rescueBalanceForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService,
              private fb: FormBuilder, private acRoute: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getUser();
    this.validationSaveBalance();
    this.validationRescueBalance();
  }

  // tslint:disable-next-line: typedef
  getUser(){
    const cryptoId = this.acRoute.snapshot.paramMap.get('id');
    this.userId =  Number(CryptoJS.AES.decrypt(cryptoId, 'secretId').toString(CryptoJS.enc.Utf8));
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.user = Object.assign({}, user);
      this.savedBalance = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.user.savedBalance);
    });
  }

  // tslint:disable-next-line: typedef
  openModal(template: any){
    this.saveBalanceForm.reset();
    this.rescueBalanceForm.reset();
    template.show();
  }

  // tslint:disable-next-line: typedef
  validationSaveBalance(){
    this.saveBalanceForm = this.fb.group({
      value : ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  saveValue(template: any){
    if (this.saveBalanceForm.valid){
      const valueSave = Number(this.saveBalanceForm.get('value').value);
      if (this.user.balance >= valueSave) {
        this.user.savedBalance = valueSave;
        this.userService.saveMoney(this.user).subscribe(
          () => {
            template.hide();
            this.getUser();
            this.toastr.success('Dinheiro Guardado com Sucesso');
          }, () => {
            this.toastr.error('O Sistema Falhou, tente novamente mais tarde');
          }
        );
      }
      else {
        this.toastr.error('O Seu Saldo Disponível é Insulficiente para o Valor Solicitado');
      }
    }
  }

  // tslint:disable-next-line: typedef
  validationRescueBalance(){
    this.rescueBalanceForm = this.fb.group({
      value : ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  rescueValue(template: any){
    if (this.rescueBalanceForm.valid){
      const valueRescue = Number(this.rescueBalanceForm.get('value').value);
      if (this.user.savedBalance >= valueRescue) {
        this.user.balance = valueRescue;
        this.userService.rescueMoney(this.user).subscribe(
          () => {
            template.hide();
            this.getUser();
            this.toastr.success('Dinheiro Resgatado com Sucesso');
          }, () => {
            this.toastr.error('O Sistema Falhou, tente novamente mais tarde');
          }
        );
      }
      else {
        this.toastr.error('O Seu Saldo Guardado é Insulficiente para o Valor Solicitado');
      }
    }
  }
}
