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
  timeCategory: string = 'meses'; // Default category

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private location: Location,
    private apiAuth: AuthService
  ) {
    this.user.id = this.route.snapshot.params['id-customer'];
    this.apiAuth.findUserByIdCustomer(this.user.id).subscribe((data:any)=>{
      this.user.creditLimit = data[0].creditLimit
    })
  }

  getMinTime() {
    return 1;
  }

  getMaxTime() {
    switch (this.timeCategory) {
      case 'semanas':
        return 20;
      case 'quincenas':
        return 10;
      case 'meses':
        return 5;
      default:
        return 1;
    }
  }

  updateTotalPagar() {
    try {
      if (this.allInputsValid()) {
        switch (this.timeCategory) {
          case 'semanas':
            this.cuotas = this.calcularCuotasSemanales(
              this.credit.mesesParaPagar,
              this.credit.tasa,
              this.credit.costoTotal,
              this.credit.periodoGracia,
              this.credit.diferido
            );
            break;
          case 'quincenas':
            this.cuotas = this.calcularCuotasQuincenales(
              this.credit.mesesParaPagar,
              this.credit.tasa,
              this.credit.costoTotal,
              this.credit.periodoGracia,
              this.credit.diferido
            );
            break;
          case 'meses':
          default:
            this.cuotas = this.calcularCuotasMensuales(
              this.credit.mesesParaPagar,
              this.credit.tasa,
              this.credit.costoTotal,
              this.credit.periodoGracia,
              this.credit.diferido
            );
            break;
        }
        this.credit.totalPagar = this.cuotas.reduce((a, b) => a + b, 0);
      } else {
        this.credit.totalPagar = 0;
        this.cuotas = [];
      }
    } catch (error: any) {
      this.error = true;
      this.error_msg = error.message;
    }
  }

  allInputsValid() {
    return this.credit.descripcionCompra &&
      this.credit.costoTotal > 0 && this.credit.costoTotal <= this.user.creditLimit &&
      this.credit.tasa > 5 && this.credit.tasa <= 10 &&
      this.credit.mesesParaPagar > 0 && this.credit.mesesParaPagar <= this.getMaxTime() &&
      (!this.credit.diferido || (this.credit.periodoGracia >= 0 && this.credit.periodoGracia < this.credit.mesesParaPagar && this.credit.periodoGracia <= 6));
  }

  async addCredit() {
    this.errors();

    if (!this.error && this.credit.totalPagar !== null) {
      const json = {
        idCustomer: this.user.id,
        costoTotal: this.credit.costoTotal,
        tasa: this.credit.tasa,
        Mora: 0,
        totalPagar: this.credit.totalPagar,
        fechaLimite: this.credit.mesesParaPagar,
        tipoTasa: "nominal",
        descripcionCompra: this.credit.descripcionCompra,
        diferido: this.credit.diferido,
        periodoGracia: this.credit.periodoGracia,
        timeCategory: this.credit.timeCategory
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
    if (this.credit.costoTotal == null || this.credit.costoTotal <= 0 || this.credit.costoTotal > this.user.creditLimit) {
      this.error = true;
      this.error_msg = `Ingrese un Costo Total válido (mayor que cero y menor o igual a ${this.user.creditLimit})`;
    }
    if (this.credit.tasa == null || this.credit.tasa <= 5 || this.credit.tasa > 10) {
      this.error = true;
      this.error_msg = 'Ingrese una Tasa válida (mayor que 5 y menor o igual a 10)';
    }
    if (this.credit.mesesParaPagar == null || this.credit.mesesParaPagar <= 0 || this.credit.mesesParaPagar > this.getMaxTime()) {
      this.error = true;
      this.error_msg = `Ingrese un número válido de Tiempo para Pagar (mayor que cero y menor o igual a ${this.getMaxTime()} ${this.timeCategory})`;
    }
    if (this.credit.diferido && (this.credit.periodoGracia == null || this.credit.periodoGracia < 0 || this.credit.periodoGracia >= this.credit.mesesParaPagar || this.credit.periodoGracia > 6)) {
      this.error = true;
      this.error_msg = 'Ingrese un Periodo de Gracia válido (mayor o igual a cero, menor que el tiempo para pagar y menor o igual a 6)';
    }
    if (this.credit.totalPagar == null) {
      this.error = true;
      this.error_msg = 'El Total a Pagar no se ha calculado correctamente';
    }
  }

  calcularCuotasSemanales(semanas: number, tasaefectivaAnual: number, costoTotalCompra: number, periodoGracia: number, isDeferred: boolean): number[] {
    let cuotas = [];
    let tasaEfectivaSemanal = (Math.pow(1 + tasaefectivaAnual / 100, 1 / 52) - 1);
    if (!isDeferred) {
      let cuotaSemanal = costoTotalCompra * (Math.pow(1 + tasaEfectivaSemanal, semanas) * tasaEfectivaSemanal) / (Math.pow(1 + tasaEfectivaSemanal, semanas) - 1);
      for (let i = 0; i < semanas; i++) {
        cuotas.push(cuotaSemanal);
      }
    } else {
      let cuotaSemanal = costoTotalCompra * (tasaEfectivaSemanal / (1 - Math.pow(1 + tasaEfectivaSemanal, -(semanas - periodoGracia))));
      let interesGracia = 0;
      for (let i = 0; i < periodoGracia; i++) {
        cuotas.push(0);
        interesGracia += costoTotalCompra * tasaEfectivaSemanal; // Calculate the interest for each grace period month
      }
      for (let i = periodoGracia; i < semanas; i++) {
        cuotas.push(cuotaSemanal + (i === periodoGracia ? interesGracia : 0)); // Add the interest to the first payment after the grace period
      }
    }
    return cuotas;
  }
  calcularCuotasQuincenales(quincenas: number, tasaefectivaAnual: number, costoTotalCompra: number, periodoGracia: number, isDeferred: boolean): number[] {
    let cuotas = [];
    let tasaEfectivaQuincenal = (Math.pow(1 + tasaefectivaAnual / 100, 1 / 24) - 1);
    if (!isDeferred) {
      let cuotaQuincenal = costoTotalCompra * (Math.pow(1 + tasaEfectivaQuincenal, quincenas) * tasaEfectivaQuincenal) / (Math.pow(1 + tasaEfectivaQuincenal, quincenas) - 1);
      for (let i = 0; i < quincenas; i++) {
        cuotas.push(cuotaQuincenal);
      }
    } else {
      let cuotaQuincenal = costoTotalCompra * (tasaEfectivaQuincenal / (1 - Math.pow(1 + tasaEfectivaQuincenal, -(quincenas - periodoGracia))));
      let interesGracia = 0;
      for (let i = 0; i < periodoGracia; i++) {
        cuotas.push(0);
        interesGracia += costoTotalCompra * tasaEfectivaQuincenal; // Calculate the interest for each grace period month
      }
      for (let i = periodoGracia; i < quincenas; i++) {
        cuotas.push(cuotaQuincenal + (i === periodoGracia ? interesGracia : 0)); // Add the interest to the first payment after the grace period
      }
    }
    return cuotas;
  }
  calcularCuotasMensuales(meses: number, tasaefectivaAnual: number, costoTotalCompra: number, periodoGracia: number, isDeferred: boolean): number[] {
    let cuotas = [];
    let tasaEfectivaMensual = (Math.pow(1 + tasaefectivaAnual / 100, 1 / 12) - 1);
    if (!isDeferred) {
      let cuotaMensual = costoTotalCompra * (Math.pow(1 + tasaEfectivaMensual, meses) * tasaEfectivaMensual) / (Math.pow(1 + tasaEfectivaMensual, meses) - 1);
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

}
