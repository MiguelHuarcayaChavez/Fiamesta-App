import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {UserEntity} from "../../../auth/model/user.entity";

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.css'
})
export class HeaderSectionComponent {
  user : UserEntity = {} as UserEntity;

  constructor(private route: ActivatedRoute, private router: Router,private api: AuthService) {
    this.user.dni = this.route.snapshot.params['dni'];
  }

  ngOnInit(){
    this.api.findUserByDni(this.user.dni).subscribe((data:any)=>{
      this.user.username = data[0].username;
      this.user.admin = data[0].admin;
    })
  }
  logout() {
    this.user.admin ? this.router.navigate(['/login-admin']) : this.router.navigate(['/login-customer']);
  }
}
