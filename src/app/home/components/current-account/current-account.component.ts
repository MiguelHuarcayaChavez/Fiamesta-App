import { Component } from '@angular/core';
import { UserEntity } from "../../../auth/model/user.entity";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../services/home.service";
import { AuthService } from "../../../auth/services/auth.service";
import { firstValueFrom } from 'rxjs';
import {CreditEntity} from "../../models/credit.entity";

@Component({
  selector: 'app-current-account',
  templateUrl: './current-account.component.html',
  styleUrls: ['./current-account.component.css']
})
export class CurrentAccountComponent {
  user: UserEntity = {} as UserEntity;
  credits: CreditEntity[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService
  ) {
    this.user.dni = this.route.snapshot.params['dni'];
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
  }
}
