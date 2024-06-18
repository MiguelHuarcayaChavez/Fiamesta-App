export class UserEntity {
  id: string;
  idAdmin:string;
  username: string;
  telefono: string;
  password: string;
  dni: string;
  admin: boolean | undefined;
  creditLimit: number;
  constructor() {
    this.id='';
    this.idAdmin = '';
    this.username='';
    this.telefono = '';
    this.password='';
    this.dni='';
    this.admin= undefined;
    this.creditLimit = 0;
  }
}
