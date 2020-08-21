import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { SaveBalanceComponent } from './saveBalance/saveBalance.component';
import { DepositComponent } from './deposit/deposit.component';

const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent}
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'balance/save/:id', component: SaveBalanceComponent, canActivate: [AuthGuard]},
  { path: 'deposit/:id', component: DepositComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
