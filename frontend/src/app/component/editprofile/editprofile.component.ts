import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  profileForm: FormGroup;
  error: string = '';

  constructor(private userService: UserService, private fb: FormBuilder ,private router:Router ,private toastr:ToastrService) {
    this.profileForm = this.fb.group({
      Name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (user:any) => {
        this.profileForm.patchValue({
          Name: user.Name,
          username: user.username,
          mobile: user.mobile,
          address: user.address,
          gender: user.gender
        });
      },
      (error:any) => {
        console.error('Error fetching current user data:', error);
      }
    );
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      this.userService.updateProfile(profileData).subscribe(
        () => {

          this.toastr.success('Profile Updated', 'Success');
          this.router.navigate(['/profile']);

        },
        (error:any) => {
          console.error('Error updating profile:', error);
          this.error = 'Error updating profile. Please try again.';
        }
      );
    }
  }

  onEnterKeyPressed(): void {
    this.updateProfile();
  }
  
  
  goback(){
    this.router.navigate(['/profile']);
  }

}