import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    PgRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
