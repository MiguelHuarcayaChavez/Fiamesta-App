import { Component } from '@angular/core';
import { UserEntity } from "../../../../auth/model/user.entity";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../../../home/services/home.service";
import { AuthService } from "../../../../auth/services/auth.service";
import { Location } from "@angular/common";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-modify-customer',
  templateUrl: './modify-customer.component.html',
  styleUrls: ['./modify-customer.component.css']
})
export class ModifyCustomerComponent {
  aux: string = '';
  user: UserEntity = {} as UserEntity;
  error: boolean = false;
  error_msg: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService,
    private location: Location
  ) {
    this.user.id = this.route.snapshot.params['id-customer'];
    this.loadUserData();
  }

  async loadUserData() {
    const data: any = await firstValueFrom(this.apiAuth.findUserByIdCustomer(this.user.id));
    this.user = { ...data[0] }; // Load user data into user object
    this.aux = this.user.dni; // Assign the user's DNI to aux
  }

  async ConfirmChangue() {
    this.errors();
    await this.foundIdAdmin();
    if (!this.error) {
      const json = {
        id: this.user.id,
        idAdmin: this.user.idAdmin,
        username: this.user.username,
        telefono: this.user.telefono,
        dni: this.user.dni,
        admin: false,
        creditLimit: this.user.creditLimit,
        tasaMora : this.user.tasaMora
      };

      this.apiAuth.modifyCustomer(json, this.user.id).subscribe((data) => {
        console.log(data);
        this.router.navigate([this.user.dni, 'details-customer']);
      });
    }
  }

  async foundIdAdmin() {
    const data: any = await firstValueFrom(this.apiAuth.findUserByIdCustomer(this.user.id));
    this.user.id = data[0].id;
    this.user.idAdmin = data[0].idAdmin;
  }

  errors() {
    this.error = false;
    this.error_msg = '';

    if (!this.user.dni.trim()) {
      this.error = true;
      this.error_msg = 'Ingrese el DNI del cliente nuevo';
    }
    if (this.user.tasaMora < 1 ||this.user.tasaMora > 10 ) {
      this.error = true;
      this.error_msg = 'Tasa de mora no puede ser menor a 1 ni mayor que 10';
    }
    if (!this.user.username.trim()) {
      this.error = true;
      this.error_msg = 'Ingrese el Nombre del cliente nuevo';
    }
    if (!this.user.telefono.trim() || this.user.telefono.length > 9) {
      this.error = true;
      this.error_msg = 'Ingrese un Teléfono válido (hasta 9 dígitos)';
    }
    if (this.user.creditLimit == null || this.user.creditLimit <= 0) {
      this.error = true;
      this.error_msg = 'Ingrese un Límite de Crédito válido (mayor que cero)';
    }
  }

  async DeleteCustomer() {
    await this.foundIdAdmin();
    await this.foundDniAdminFromCustomeridAdmin();
    this.apiAuth.deleteUserById(this.user.id).subscribe({
      next: (data) => {
        console.log(data);
        //Enviar dni del admin
        this.router.navigate([ this.aux ,`home-admin`]);
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.error_msg = 'Error al eliminar el cliente';
      }
    });
  }


  async foundDniAdminFromCustomeridAdmin(){
    const data: any = await firstValueFrom(this.apiAuth.findUserIdByIdAdmin(this.user.idAdmin));
    this.aux = data[0].dni;
  }
}
