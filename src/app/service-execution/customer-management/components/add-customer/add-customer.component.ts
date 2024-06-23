import { Component } from '@angular/core';
import { UserEntity } from "../../../../auth/model/user.entity";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../../../home/services/home.service";
import { AuthService } from "../../../../auth/services/auth.service";
import { Location } from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
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
    this.user.idAdmin = this.route.snapshot.params['id-admin'];

  }

  async addCustomer() {
    await this.errors();

    if (!this.error) {
      const json = {
        idAdmin: this.user.idAdmin,
        username: this.user.username,
        telefono: this.user.telefono,
        dni: this.user.dni,
        admin: false,
        creditLimit: this.user.creditLimit
      };

      this.apiAuth.createUser(json).subscribe((data) => {
        console.log(data);
        this.location.back();
      });
    }
  }

  async errors() {
    this.error = false;
    this.error_msg = '';

    const dniCheck: Observable<any> = this.apiAuth.findUserByDni(this.user.dni);
    const dniCheckResult = await dniCheck.toPromise();

    if (dniCheckResult[0] !== undefined) {
      this.error = true;
      this.error_msg = 'DNI already registered';
    }

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
}
