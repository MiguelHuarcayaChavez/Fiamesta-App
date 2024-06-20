import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PgLoginAdminComponent} from "./auth/pages/pg-login-admin/pg-login-admin.component";
import { PgHomeAdminComponent } from './home/pages/pg-home-admin/pg-home-admin.component';

import {PgLoginCustomerComponent} from "./auth/pages/pg-login-customer/pg-login-customer.component";
import {PgRegisterComponent} from "./auth/pages/pg-register/pg-register.component";
import {PgHomeCustomerComponent} from "./home/pages/pg-home-customer/pg-home-customer.component";
import {
  PgAddCustomerComponent
} from "./service-execution/customer-management/pages/pg-add-customer/pg-add-customer.component";
import {
  PgModifyCustomerDataComponent
} from "./service-execution/customer-management/pages/pg-modify-customer-data/pg-modify-customer-data.component";
import {
  PgCustomerDetailsComponent
} from "./service-execution/customer-management/pages/pg-customer-details/pg-customer-details.component";
import {PgAddCreditComponent} from "./service-execution/credit-management/pages/pg-add-credit/pg-add-credit.component";
import {
  PgModifyCreditComponent
} from "./service-execution/credit-management/pages/pg-modify-credit/pg-modify-credit.component";



const routes: Routes = [
  //Login nad Home - ADMIN
  {path: 'login-admin', component: PgLoginAdminComponent},
  { path: ':dni/home-admin', component: PgHomeAdminComponent },

  //Login nad Home - CUSTOMER
  {path: 'login-customer', component: PgLoginCustomerComponent},
  { path: ':dni/home-customer', component: PgHomeCustomerComponent },

  //Customer Management
  {path: ':dni-admin/add-customer', component: PgAddCustomerComponent },
  {path: ':dni-customer/details-customer', component: PgCustomerDetailsComponent },
  {path: ':id-customer/modify-customer', component: PgModifyCustomerDataComponent },

  //Credit Management**************
  {path: ':id-customer/add-credit', component: PgAddCreditComponent },
  {path: ':id-credit/modify-credit', component: PgModifyCreditComponent },

  //Register and Default
  {path: 'register', component: PgRegisterComponent},
  {path: '', redirectTo: 'login-admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
