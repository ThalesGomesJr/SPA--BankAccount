import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthUrlGuard } from '../auth/auth.urlguard';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
              private fb: FormBuilder, private urlGuard: AuthUrlGuard, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.userId = this.urlGuard.getToProfile();
    this.getUser();
    this.validationSaveBalance();
    this.validationRescueBalance();
  }

  // tslint:disable-next-line: typedef
  getUser(){
    if (this.userId){
      this.userService.getUserById(this.userId).subscribe((user: User) => {
        this.user = Object.assign({}, user);
        this.savedBalance = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.user.savedBalance);
      });
    }
    else{
      const name = sessionStorage.getItem('username');
      this.userService.getUserByName(name).subscribe((user: User) => {
        this.user = Object.assign({}, user);
        this.savedBalance = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.user.savedBalance);
      });
    }
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
