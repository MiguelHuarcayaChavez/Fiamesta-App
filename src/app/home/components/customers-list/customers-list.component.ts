import { Component } from '@angular/core';
import {UserEntity} from "../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../services/home.service";
import {AuthService} from "../../../auth/services/auth.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent {
  user: UserEntity = {} as UserEntity;
  customers: UserEntity[] = [];
  numeroDeComprasTotales: number[] = [];
  TotalEnDeuda: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService
  ) {
    this.user.dni = this.route.snapshot.params['dni'];
  }

  ngOnInit() {
    this.foundCustomers();
  }

  async foundCustomers() {
    await this.foundIdAdmin();
    this.apiAuth.findCustomersByAdminId(this.user.id).subscribe(async(data: any) => {
      data.map(async (data:any)=>{
        this.customers.push(data)
        await this.foundCreditsAndTotal(data.id)
      })
    });
  }
  async foundIdAdmin() {
    const data: any = await firstValueFrom(this.apiAuth.findUserByDni(this.user.dni));
    this.user.id = data[0].id;
  }

  async foundCreditsAndTotal(idCustomer: any){
    const data: any = await firstValueFrom(this.apiHome.findAllCreditsByIdCustomer(idCustomer));
    let numerosCreditosHechos = 0;
    let totalDebe = 0;
    data.map((info:any)=>{
      numerosCreditosHechos++;
      totalDebe += info.totalPagar;
    })
    this.numeroDeComprasTotales.push(numerosCreditosHechos)
    this.TotalEnDeuda.push(totalDebe)
  }

  //Botones
  addCustomer(){
    this.router.navigate([ this.user.dni,`add-customer`])
  }

  viewCustomerDetails(idCustomer: any){
    this.router.navigate([ idCustomer,`add-customer`])
  }


}
