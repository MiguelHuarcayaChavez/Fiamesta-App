import { Component } from '@angular/core';
import {UserEntity} from "../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../services/home.service";
import {AuthService} from "../../../auth/services/auth.service";
import {CreditEntity} from "../../models/credit.entity";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
})
export class CreditComponent {
  user: UserEntity = {} as UserEntity;
  credit: CreditEntity = {} as CreditEntity;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService
  ) {
    this.user.dni = this.route.snapshot.params['dni'];
  }

  ngOnInit() {
    console.log(this.user.dni)
  }

}
