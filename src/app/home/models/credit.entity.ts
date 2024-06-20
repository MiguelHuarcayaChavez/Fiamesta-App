export class CreditEntity {
  id: string;
  idCustomer: string;
  costoTotal: number;
  tasa: number;
  Mora: boolean;
  totalPagar: number;
  mesesParaPagar: number;
  tipoTasa: string;
  descripcionCompra: string;
  diferido: boolean;
  periodoGracia: number;
  constructor() {
    this.id='';
    this.idCustomer='';
    this.costoTotal=0;
    this.tasa=0;
    this.Mora=false;
    this.totalPagar=0;
    this.mesesParaPagar=0;
    this.tipoTasa='';
    this.descripcionCompra='';
    this.diferido = false;
    this.periodoGracia = 0;

  }
}


