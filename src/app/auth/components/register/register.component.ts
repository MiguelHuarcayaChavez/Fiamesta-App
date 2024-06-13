import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface User {
  id: number;
  username: string;
  dni: string;
  password: string;
  admin: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { id: 0, username: '', dni: '', password: '', admin: false };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.registerUser(this.user).subscribe(
      () => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/login-customer']);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
