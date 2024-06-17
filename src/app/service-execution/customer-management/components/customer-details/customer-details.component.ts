import { Component } from '@angular/core';
import {UserEntity} from "../../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../../home/services/home.service";
import {AuthService} from "../../../../auth/services/auth.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  user: UserEntity = {} as UserEntity;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHome: HomeService,
    private apiAuth: AuthService
  ) {
    this.user.id = this.route.snapshot.params['id-customer'];
  }
}
