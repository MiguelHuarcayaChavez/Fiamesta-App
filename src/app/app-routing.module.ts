import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PgLoginAdminComponent} from "./auth/pages/pg-login-admin/pg-login-admin.component";
import {PgLoginCustomerComponent} from "./auth/pages/pg-login-customer/pg-login-customer.component";
import {PgRegisterComponent} from "./auth/pages/pg-register/pg-register.component";

const routes: Routes = [
  {path: 'login-admin', component: PgLoginAdminComponent},
  {path: 'login-customer', component: PgLoginCustomerComponent},
  {path: 'register', component: PgRegisterComponent},
  {path: '', redirectTo: 'login-admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
