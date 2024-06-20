import { Component } from '@angular/core';
import {UserEntity} from "../../../../auth/model/user.entity";
import {CreditEntity} from "../../../../home/models/credit.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../../home/services/home.service";
import {AuthService} from "../../../../auth/services/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-credit-logic',
  templateUrl: './add-credit-logic.component.html',
  styleUrl: './add-credit-logic.component.css'
})
export class AddCreditLogicComponent {
  user: UserEntity = {} as UserEntity;
  credit: CreditEntity = {} as CreditEntity;
  error: boolean = false;
  error_msg: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private location: Location,
    private apiAuth: AuthService
  ) {
    this.user.id = this.route.snapshot.params['id-customer'];
  }
  async addCredit() {
    this.errors();

    if (!this.error) {
      const json = {
        idCustomer: this.user.id,
        costoTotal: this.credit.costoTotal,
        tasa: this.credit.tasa,
        Mora: false,
        totalPagar: this.credit.totalPagar,
        fechaLimite: this.credit.fechaLimite,
        tipoTasa: "nominal",
        descripcionCompra: this.credit.descripcionCompra,
        diferido: this.credit.diferido,
        periodoGracia: this.credit.periodoGracia
      };

      this.apiHome.createCredit(json).subscribe((data) => {
        console.log(data);
        this.location.back();
      });
    }
  }

  errors() {
    this.error = false;
    this.error_msg = '';

    if (!this.credit.descripcionCompra.trim()) {
      this.error = true;
      this.error_msg = 'Ingrese la Descripción de la Compra';
    }
    if (this.credit.costoTotal == null || this.credit.costoTotal <= 0) {
      this.error = true;
      this.error_msg = 'Ingrese un Costo Total válido (mayor que cero)';
    }
    if (this.credit.tasa == null || this.credit.tasa < 0) {
      this.error = true;
      this.error_msg = 'Ingrese una Tasa válida (mayor o igual a cero)';
    }
    if (this.credit.totalPagar == null || this.credit.totalPagar <= 0) {
      this.error = true;
      this.error_msg = 'Ingrese un Total a Pagar válido (mayor que cero)';
    }
    if (!this.credit.fechaLimite) {
      this.error = true;
      this.error_msg = 'Ingrese una Fecha Límite válida';
    }
  }


}
