import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface User {
  id: number;
  username: string;
  dni: string;
  password: string;
  admin: boolean;
}

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent {
  dni: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log('Submit button clicked'); // Verificar que la función onSubmit() se está llamando

    // Obtener la lista de usuarios
    this.authService.getUsers().subscribe(data => {
      console.log('Users:', data.users); // Verificar los datos de los usuarios devueltos por el servicio
      const users: User[] = data.users;

      // Filtrar los usuarios que no sean administradores
      const customerUsers: User[] = users.filter(user => !user.admin);
      console.log('Customer users:', customerUsers); // Verificar los usuarios filtrados

      // Buscar el usuario por DNI
      const user = customerUsers.find(u => u.dni === this.dni);
      console.log('User found:', user); // Verificar el usuario que se está buscando

      if (user) {
        // Si se encuentra el usuario, redirigir a la página adecuada para clientes
        this.router.navigate(['/pg-home-customer']);
      } else {
        // Si no se encuentra el usuario, mostrar un mensaje de error
        alert('DNI incorrecto o no tiene permisos de cliente.');
      }
    });
  }
}
