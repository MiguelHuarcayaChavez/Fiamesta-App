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
    console.log(this.user.dni)
    this.api.findUserByDni(this.user.dni).subscribe((data:any)=>{
      console.log(data)
      this.user.username = data[0].username;
    })
  }
}
