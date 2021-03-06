import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user = new User();

  constructor(public fb: FormBuilder, private toastr: ToastrService,
              private authService: AuthService, public router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.validation();
  }

  // tslint:disable-next-line: typedef
  validation(){
    this.registerForm = this.fb.group({
      userName : ['', Validators.required],
      fullName : ['', Validators.required],
      cpf: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      passwords : this.fb.group({
        password : ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword : ['', Validators.required]
      }, { validators : this.verifyPassword })
    });
  }

  // tslint:disable-next-line: typedef
  verifyPassword(fb: FormGroup){
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value){
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  // tslint:disable-next-line: typedef
  registrationUser(){
    if (this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code){
              case 'DuplicateUserName':
                this.toastr.error('Nome de Usu??rio j?? Existe');
                break;
              default:
                this.toastr.error(`Erro no Cadastro. CODE: ${element.code}`);
            }
          });
        }
      );
    }
  }
}
