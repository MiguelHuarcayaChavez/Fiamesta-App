import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PgLoginAdminComponent} from "./auth/pages/pg-login-admin/pg-login-admin.component";
import { PgHomeAdminComponent } from './home/pages/pg-home-admin/pg-home-admin.component';

import {PgLoginCustomerComponent} from "./auth/pages/pg-login-customer/pg-login-customer.component";
import {PgRegisterComponent} from "./auth/pages/pg-register/pg-register.component";
import {PgHomeCustomerComponent} from "./home/pages/pg-home-customer/pg-home-customer.component";



const routes: Routes = [
  {path: 'login-admin', component: PgLoginAdminComponent},
  { path: ':dni/home-admin', component: PgHomeAdminComponent },

  {path: 'login-customer', component: PgLoginCustomerComponent},
  { path: ':dni/home-customer', component: PgHomeCustomerComponent },


  {path: 'register', component: PgRegisterComponent},
  {path: '', redirectTo: 'login-admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
