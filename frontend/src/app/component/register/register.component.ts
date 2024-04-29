// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { UserService } from 'src/app/service/user.service';



// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   formRegister: FormGroup;

//   constructor ( private router: Router , private userService: UserService ,private toastr : ToastrService) {
//     this.formRegister = new FormGroup({
//       username: new FormControl('', [Validators.required]),
//       password: new FormControl('', [
//         Validators.required,
//         Validators.minLength(5)
//       ]),
//     })
//   }

//   ngOnInit(): void {}


//   onSubmit() {
//     const userData = this.formRegister.value;
//     console.log(userData);
//     this.userService.register(userData)
//       .subscribe(res => {
//         this.toastr.success('Successfully Registered', 'Success');
//       this.router.navigate(['/login']);
//       },
//       error=>{

//         this.toastr.error('Already Registered', 'Error! Try again'); 

        
//       })
    
      
//   }

// }


import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

// Custom validator function
const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (passwordControl && confirmPasswordControl) {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    }, { validators: passwordMatchValidator }); 
  }

  ngOnInit(): void {}

  onSubmit() {
    const userData = this.formRegister.value;

    // console.log(userData);

    this.userService.register(userData)
      .subscribe(
        res => {
          this.toastr.success('Successfully Registered', 'Success');
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error('Already Registered', 'Error! Try again');
        }
      );
  }
}
