import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './auth/components/login-admin/login-admin.component';
import { LoginCustomerComponent } from './auth/components/login-customer/login-customer.component';
import { RegisterComponent } from './auth/components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    LoginCustomerComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
