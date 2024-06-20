import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'http://localhost:3000';
  constructor(private http:HttpClient){
  }


  findAllCreditsByIdCustomer(idCustomer:any){
    return this.http.get(`${this.baseUrl}/credits?idCustomer=${idCustomer}`)
  }
  createCredit(json:any){
    return this.http.post(`${this.baseUrl}/credits`,json)
  }

  modifyCredit(jsonCredit:any, idCredit:any){
    return this.http.put(`${this.baseUrl}/credits/${idCredit}`,jsonCredit)
  }

  deleteCredit(idCredit:any){
    return this.http.delete(`${this.baseUrl}/credits/${idCredit}`)
  }
  getCreditById(idCredit:any){
    return this.http.get(`${this.baseUrl}/credits?id=${idCredit}`)
  }

}
