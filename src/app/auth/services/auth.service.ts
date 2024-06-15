import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface User {
  id: number;
  username: string;
  dni: string;
  password: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000';
  constructor(private http:HttpClient){
  }

  createUser(jsonUser:any){
    return this.http.post(`${this.baseUrl}/users`,jsonUser)
  }
  findUserByDniAndPassword(dni:any,password:any){
    return this.http.get(`${this.baseUrl}/users?dni=${dni}&password=${password}`)
  }
  findUserByDni(dni:any){
    return this.http.get(`${this.baseUrl}/users?dni=${dni}`)
  }

}
