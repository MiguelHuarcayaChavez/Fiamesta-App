export class UserEntity {
  id: string;
  username: string;
  password: string;
  dni: string;
  admin: boolean | undefined;
  constructor() {
    this.id='';
    this.username='';
    this.password='';
    this.dni='';
    this.admin= undefined;
  }
}
