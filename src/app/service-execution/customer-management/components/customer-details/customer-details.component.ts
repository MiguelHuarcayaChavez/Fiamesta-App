import { Component } from '@angular/core';
import {UserEntity} from "../../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../../home/services/home.service";
import {AuthService} from "../../../../auth/services/auth.service";
import {CreditEntity} from "../../../../home/models/credit.entity";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  user: UserEntity = {} as UserEntity;
  credits: CreditEntity[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService
  ) {
    this.user.dni = this.route.snapshot.params['dni-customer'];
  }

  ngOnInit() {
    this.foundCredits();
  }

  async foundCredits() {
    await this.foundIdCustomer();
    this.apiHome.findAllCreditsByIdCustomer(this.user.id).subscribe((data: any) => {
      data.map((data:any)=>{
        this.credits.push(data)
      })
    });
  }

  async foundIdCustomer() {
    const data: any = await firstValueFrom(this.apiAuth.findUserByDni(this.user.dni));
    this.user.id = data[0].id;
    this.user.telefono = data[0].telefono;
    this.user.username = data[0].username;
  }

  ModifyCustomer(){
    this.router.navigate([ this.user.id,`modify-customer`])
  }

  ModifyCredit(creditId: any){
    this.router.navigate([ creditId,`modify-credit`])
  }

  AddCredit(){
    this.router.navigate([ this.user.id ,`add-credit`])
  }

}
