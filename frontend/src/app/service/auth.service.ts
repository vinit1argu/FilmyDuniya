import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInVar = false;
    redirectUrl: string | undefined;

  get isLoggedIn(): boolean {
   
    // return this.isLoggedInVar;

    return localStorage.getItem('isLoggedIn') === 'true';
  }

  set isLoggedIn(value: boolean) {
    // this.isLoggedInVar = value;


    localStorage.setItem('isLoggedIn', value.toString());
  }
}
