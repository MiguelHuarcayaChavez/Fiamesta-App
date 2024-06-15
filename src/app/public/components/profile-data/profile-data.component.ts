import { Component } from '@angular/core';
import {UserEntity} from "../../../auth/model/user.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css'
})
export class ProfileDataComponent {
  user : UserEntity = {} as UserEntity;

  constructor(private route: ActivatedRoute, private router: Router,private api: AuthService) {
    this.user.dni = this.route.snapshot.params['dni'];
  }

  ngOnInit(){
    console.log(this.user.dni)
    this.api.findUserByDni(this.user.dni).subscribe((data:any)=>{
      this.user.username = data[0].username;
      this.user.dni = data[0].dni;
      this.user.id = data[0].id;
    })
  }
}
