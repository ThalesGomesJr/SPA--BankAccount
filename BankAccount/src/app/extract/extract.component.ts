import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Extract } from '../models/Extract' ;
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  userId: number;
  user = new User();
  balance: string;
  extract: Extract[];

  constructor(private userService: UserService, private acRoute: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getUser();
  }

  // tslint:disable-next-line: typedef
  getUser(){
    const cryptoId = this.acRoute.snapshot.paramMap.get('id');
    this.userId =  Number(CryptoJS.AES.decrypt(cryptoId, 'secretId').toString(CryptoJS.enc.Utf8));
    this.userService.getUserExtractById(this.userId).subscribe((user: User) => {
      this.user = Object.assign({}, user);
      this.balance = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(this.user.balance);
      this.extract = this.user.extract;
      this.extract.forEach(movement => {
        movement.value =  new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(movement.value));
      });
    });
  }

}
