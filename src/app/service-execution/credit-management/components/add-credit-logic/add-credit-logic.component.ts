import { Component } from '@angular/core';
import { UserEntity } from '../../../../auth/model/user.entity';
import { CreditEntity } from '../../../../home/models/credit.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../../../home/services/home.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-credit-logic',
  templateUrl: './add-credit-logic.component.html',
  styleUrls: ['./add-credit-logic.component.css']
})
export class AddCreditLogicComponent {
  user: UserEntity = {} as UserEntity;
  credit: CreditEntity = {} as CreditEntity;
  cuotas: number[] = [];
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

  updateTotalPagar() {
    try {
      if (this.allInputsValid()) {
        this.cuotas = this.calcularCuotasTIN(
          this.credit.mesesParaPagar,
          this.credit.tasa,
          this.credit.costoTotal,
          this.credit.diferido,
          this.credit.periodoGracia
        );
        this.credit.totalPagar = this.cuotas.reduce((a, b) => a + b, 0);
      } else {
        this.credit.totalPagar = 0;
        this.cuotas = [];
      }
    } catch (error:any) {
      this.error = true;
      this.error_msg = error.message;
    }
  }

  allInputsValid() {
    return this.credit.descripcionCompra &&
      this.credit.costoTotal > 0 && this.credit.costoTotal <= 250 &&
      this.credit.tasa > 0 && this.credit.tasa <= 10 &&
      this.credit.mesesParaPagar > 0 && this.credit.mesesParaPagar <= 6 &&
      (!this.credit.diferido || (this.credit.periodoGracia >= 0 && this.credit.periodoGracia < this.credit.mesesParaPagar && this.credit.periodoGracia <= 3));
  }

  calcularCuotasTIN(meses: number, tasaEfectivaMensual: number, costoTotalCompra: number, isDeferred: boolean, periodoGracia: number): number[] {
    let cuotas: number[] = [];
    tasaEfectivaMensual /= 100; // Convert the rate to a decimal

    if (!isDeferred) {
      let cuotaMensual = costoTotalCompra * (tasaEfectivaMensual / (1 - Math.pow(1 + tasaEfectivaMensual, -meses)));
      for (let i = 0; i < meses; i++) {
        cuotas.push(cuotaMensual);
      }
    } else {
      let cuotaMensual = costoTotalCompra * (tasaEfectivaMensual / (1 - Math.pow(1 + tasaEfectivaMensual, -(meses - periodoGracia))));
      let interesGracia = 0;
      for (let i = 0; i < periodoGracia; i++) {
        cuotas.push(0);
        interesGracia += costoTotalCompra * tasaEfectivaMensual; // Calculate the interest for each grace period month
      }
      for (let i = periodoGracia; i < meses; i++) {
        cuotas.push(cuotaMensual + (i === periodoGracia ? interesGracia : 0)); // Add the interest to the first payment after the grace period
      }
    }
    return cuotas;
  }

  async addCredit() {
    this.errors();

    if (!this.error && this.credit.totalPagar !== null) {
      const json = {
        idCustomer: this.user.id,
        costoTotal: this.credit.costoTotal,
        tasa: this.credit.tasa,
        Mora: false,
        totalPagar: this.credit.totalPagar,
        fechaLimite: this.credit.mesesParaPagar,
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
    if (this.credit.costoTotal == null || this.credit.costoTotal <= 0 || this.credit.costoTotal > 250) {
      this.error = true;
      this.error_msg = 'Ingrese un Costo Total válido (mayor que cero y menor o igual a 250)';
    }
    if (this.credit.tasa == null || this.credit.tasa <= 0 || this.credit.tasa > 10) {
      this.error = true;
      this.error_msg = 'Ingrese una Tasa válida (mayor que cero y menor o igual a 10)';
    }
    if (this.credit.mesesParaPagar == null || this.credit.mesesParaPagar <= 0 || this.credit.mesesParaPagar > 6) {
      this.error = true;
      this.error_msg = 'Ingrese un número válido de Meses para Pagar (mayor que cero y menor o igual a 6)';
    }
    if (this.credit.diferido && (this.credit.periodoGracia == null || this.credit.periodoGracia < 0 || this.credit.periodoGracia >= this.credit.mesesParaPagar || this.credit.periodoGracia > 3)) {
      this.error = true;
      this.error_msg = 'Ingrese un Periodo de Gracia válido (mayor o igual a cero, menor que los meses para pagar y menor o igual a 3)';
    }
    if (this.credit.totalPagar == null) {
      this.error = true;
      this.error_msg = 'El Total a Pagar no se ha calculado correctamente';
    }
  }
}
