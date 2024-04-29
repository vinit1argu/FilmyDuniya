import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


   private apiUrl = 'http://localhost:3002/auth';

   constructor(private http:HttpClient , private authservice:AuthService) { }

    register(user: any){
      return this.http.post<any>(`${this.apiUrl}/register`, user)
    }


  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.post<any>(`${this.apiUrl}/logout`,{},options);
  }

  getCurrentUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.get<any>(`${this.apiUrl}/current-user`, options);
  }

  updateProfile(profileData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.put<any>(`${this.apiUrl}/update-user`, profileData, options);
  }

}
