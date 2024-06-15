import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {UserEntity} from "../../model/user.entity";

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent {
  user: UserEntity = {} as UserEntity;
  error: boolean = false;
  error_msg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.findUserByDni(this.user.dni).subscribe((data:any)=>{
      const info = data[0];
      if (info === undefined) {
        this.error = true;
        this.error_msg = 'DNI not found';
      } else {
        if(info.admin === false){
          this.router.navigate([info.dni,`home-customer`]);
        }else{
          this.error = true;
          this.error_msg = 'This DNI not a customer';
        }
      }
    })
  }
}
