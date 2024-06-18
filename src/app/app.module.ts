import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Añadir FormsModule
import { HttpClientModule } from '@angular/common/http'; // Añadir HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './auth/components/login-admin/login-admin.component';
import { LoginCustomerComponent } from './auth/components/login-customer/login-customer.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { FooterSectionComponent } from './public/components/footer-section/footer-section.component';
import { PgPageNotFoundComponent } from './public/pages/pg-page-not-found/pg-page-not-found.component';
import { PgLoginAdminComponent } from './auth/pages/pg-login-admin/pg-login-admin.component';
import { PgLoginCustomerComponent } from './auth/pages/pg-login-customer/pg-login-customer.component';
import { PgRegisterComponent } from './auth/pages/pg-register/pg-register.component';
import { HeaderSectionComponent } from './public/components/header-section/header-section.component';
import { ProfileDataComponent } from './public/components/profile-data/profile-data.component';
import { PgHomeAdminComponent } from './home/pages/pg-home-admin/pg-home-admin.component';
import { PgHomeCustomerComponent } from './home/pages/pg-home-customer/pg-home-customer.component';
import { CurrentAccountComponent } from './home/components/current-account/current-account.component';
import { CustomersListComponent } from './home/components/customers-list/customers-list.component';
import { PgAddCustomerComponent } from './service-execution/customer-management/pages/pg-add-customer/pg-add-customer.component';
import { PgCustomerDetailsComponent } from './service-execution/customer-management/pages/pg-customer-details/pg-customer-details.component';
import { PgModifyCustomerDataComponent } from './service-execution/customer-management/pages/pg-modify-customer-data/pg-modify-customer-data.component';
import { AddCustomerComponent } from './service-execution/customer-management/components/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './service-execution/customer-management/components/customer-details/customer-details.component';
import { HeaderGenericSectionComponent } from './public/components/header-generic-section/header-generic-section.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import { PgModifyCreditComponent } from './service-execution/credit-management/pages/pg-modify-credit/pg-modify-credit.component';
import { PgAddCreditComponent } from './service-execution/credit-management/pages/pg-add-credit/pg-add-credit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    LoginCustomerComponent,
    RegisterComponent,
    FooterSectionComponent,
    PgPageNotFoundComponent,
    PgLoginAdminComponent,
    PgLoginCustomerComponent,
    PgRegisterComponent,
    HeaderSectionComponent,
    ProfileDataComponent,
    PgHomeAdminComponent,
    PgHomeCustomerComponent,
    CurrentAccountComponent,
    CustomersListComponent,
    PgAddCustomerComponent,
    PgCustomerDetailsComponent,
    PgModifyCustomerDataComponent,
    AddCustomerComponent,
    CustomerDetailsComponent,
    HeaderGenericSectionComponent,
    PgModifyCreditComponent,
    PgAddCreditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Añadir FormsModule
    MatIconModule,
    HttpClientModule // Añadir HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

