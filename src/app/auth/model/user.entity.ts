export class UserEntity {
  username: string;
  password: string;
  dni: string;
  admin: boolean | undefined;
  constructor() {
    this.username='';
    this.password='';
    this.dni='';
    this.admin= undefined;
  }
}
