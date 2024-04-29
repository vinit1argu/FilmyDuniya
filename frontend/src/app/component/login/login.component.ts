import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
 

  constructor ( private router: Router , private userService:UserService ,private toastr: ToastrService , private authservice:AuthService) {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }

  ngOnInit(): void {}
  

  onSubmit() {
    if (this.formLogin.valid) {
      const userData = this.formLogin.value;
      this.userService.login(userData).subscribe(
        response => {
          // console.log(response);
          localStorage.setItem('accessToken', response.accessToken);
          this.authservice.isLoggedIn=true;
          this.toastr.success('Logged In Successfully', 'Success');
          this.router.navigate(['/movie']); 
        },
        error => {
          this.toastr.error('Invalid user or password', 'Error! Try again'); 
          console.log(error);
         
        }
      );
    }
  }
  
}
