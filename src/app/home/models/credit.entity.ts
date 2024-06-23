export class CreditEntity {
  id: string;
  idCustomer: string;
  costoTotal: number;
  tasa: number;
  Mora: number;
  totalPagar: number;
  mesesParaPagar: number;
  tipoTasa: string;
  descripcionCompra: string;
  diferido: boolean;
  periodoGracia: number;
  timeCategory: string;
  constructor() {
    this.id='';
    this.idCustomer='';
    this.costoTotal=0;
    this.tasa=0;
    this.Mora=0;
    this.totalPagar=0;
    this.mesesParaPagar=0;
    this.tipoTasa='';
    this.descripcionCompra='';
    this.diferido = false;
    this.periodoGracia = 0;
    this.timeCategory = '';

  }
}


