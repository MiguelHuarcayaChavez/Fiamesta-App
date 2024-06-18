import { Component } from '@angular/core';
import {UserEntity} from "../../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../../home/services/home.service";
import {AuthService} from "../../../../auth/services/auth.service";
import {Location} from "@angular/common";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-modify-customer',
  templateUrl: './modify-customer.component.html',
  styleUrl: './modify-customer.component.css'
})
export class ModifyCustomerComponent {
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
        creditLimit: this.user.creditLimit
      };

      this.apiAuth.modifyCustomer(json,this.user.id).subscribe((data) => {
        console.log(data);
        this.router.navigate([ this.user.dni,`details-customer`])
      });
    }
  }

  async foundIdAdmin(){
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

  DeleteCostumer(){

  }
}
