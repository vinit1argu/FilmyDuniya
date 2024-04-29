import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {


  private apiUrl = 'https://api.themoviedb.org/3/trending';
  private apiKey = '1a8f23eb94b9216ecdb70d4339407156';


  constructor(private http:HttpClient) { }

 
  getperson(): Observable<any> {
    const aUrl = `${this.apiUrl}/person/week?api_key=${this.apiKey}`;
    return this.http.get<any>(aUrl);
  }

  getmovie(): Observable<any> {
    const aUrl = `${this.apiUrl}/movie/week?api_key=${this.apiKey}`;
    return this.http.get<any>(aUrl);
  }

  getTv(): Observable<any> {
    const aUrl = `${this.apiUrl}/tv/week?api_key=${this.apiKey}`;
    return this.http.get<any>(aUrl);
  }

  getPersonbyId(id: number): Observable<any> {
    const Idurl = `https://api.themoviedb.org/3/person/${id}?api_key=${this.apiKey}`;

    return this.http.get<any>(Idurl);
  }


}

