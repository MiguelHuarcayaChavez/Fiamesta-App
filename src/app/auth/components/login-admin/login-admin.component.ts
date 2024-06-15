import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {UserEntity} from "../../model/user.entity";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  user: UserEntity = {} as UserEntity;
  error: boolean = false;
  error_msg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.findUserByDniAndPassword(this.user.dni, this.user.password).subscribe((data:any)=>{
      const info = data[0];
      if (info === undefined) {
        this.error = true;
        this.error_msg = 'DNI or Password incorrect';
      } else {
        this.router.navigate([ info.dni,`home-admin`]);
      }
    })
  }
}
