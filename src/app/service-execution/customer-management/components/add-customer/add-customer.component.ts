import { Component } from '@angular/core';
import {UserEntity} from "../../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../../home/services/home.service";
import {AuthService} from "../../../../auth/services/auth.service";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  user: UserEntity = {} as UserEntity;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService
  ) {
    this.user.dni = this.route.snapshot.params['dni-admin'];
  }

}
