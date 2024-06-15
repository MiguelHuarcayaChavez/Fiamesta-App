import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {UserEntity} from "../../model/user.entity";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: UserEntity = {} as UserEntity;
  error: boolean = false;
  error_msg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    await this.errors();

    if (!this.error) {
      const json = {
        username: this.user.username,
        dni: this.user.dni,
        password: this.user.password,
        admin: true
      };

      this.authService.createUser(json).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/login-admin']);
      });
    }
  }

  async errors() {
    this.error = false;
    this.error_msg="";

    const dniCheck: Observable<any> = this.authService.findUserByDni(this.user.dni);
    const dniCheckResult = await dniCheck.toPromise();

    if (dniCheckResult[0] !== undefined) {
      this.error = true;
      this.error_msg = 'DNI already registered';
    }
  }
}
