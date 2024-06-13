import { Component, OnInit } from '@angular/core';
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
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  dni: string = '';
  password: string = '';
  users: User[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(data => {
      this.users = data.users;
      console.log('Users loaded:', this.users); // Verifica que los usuarios se cargan
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  onSubmit() {
    console.log('DNI:', this.dni, 'Password:', this.password); // Verifica los valores del formulario
    const user = this.users.find((u: User) => u.dni === this.dni && u.password === this.password && u.admin);
    if (user) {
      console.log('Login successful:', user); // Verifica el usuario encontrado
      this.router.navigate(['/pg-home-admin']);
    } else {
      console.error('Login failed: invalid credentials or not an admin'); // Informa del fallo de login
      alert('DNI o contraseña incorrectos, o no tiene permisos de administrador.');
    }
  }
}
