import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit {

  user : any;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data:any)=>{
      this.user = data;
      // console.log(this.user);
      
    },
    (error:any)=>{
      console.log('Error fetching current user', error);
    }
    );
  }

  
}
