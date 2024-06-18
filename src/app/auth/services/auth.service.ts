import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  //Devuelve todos los users que tengan en el campo idAdmin el id que le pasamos (del admin xd)
  findCustomersByAdminId(idAdmin:any){
    return this.http.get(`${this.baseUrl}/users?idAdmin=${idAdmin}`)
  }

   modifyCustomer(jsonCustomer:any, idCustomer:any){
     return this.http.put(`${this.baseUrl}/users/${idCustomer}`,jsonCustomer)
   }

   findUserByIdCustomer(idCustomer:any){
     return this.http.get(`${this.baseUrl}/users?id=${idCustomer}`)
   }
}
