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

}
