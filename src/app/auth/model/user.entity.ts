export class UserEntity {
  id: string;
  username: string;
  telefono: string;
  password: string;
  dni: string;
  admin: boolean | undefined;
  constructor() {
    this.id='';
    this.username='';
    this.telefono = '';
    this.password='';
    this.dni='';
    this.admin= undefined;
  }
}
