export class CreditEntity {
  id: string;
  idCustomer: string;
  costoTotal: number | null;
  tasa: number | null;
  Mora: true | null;
  totalPagar: number | null;
  fechaLimite: string;
  tipoTasa: string;
  descripcionCompra: string;
  diferido: boolean;
  periodoGracia: number;
  constructor() {
    this.id='';
    this.idCustomer='';
    this.costoTotal=null;
    this.tasa=null;
    this.Mora=null;
    this.totalPagar=null;
    this.fechaLimite='';
    this.tipoTasa='';
    this.descripcionCompra='';
    this.diferido = false;
    this.periodoGracia = 0;

  }
}


