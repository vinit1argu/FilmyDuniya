import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '1a8f23eb94b9216ecdb70d4339407156';


  constructor(private http:HttpClient) { }
 
  getOntheAir(): Observable<any> {
    const aUrl = `${this.apiUrl}/tv/on_the_air?api_key=${this.apiKey}`;
    return this.http.get<any>(aUrl);
  }

  getPopular(): Observable<any> {
    const aUrl = `${this.apiUrl}/tv/popular?api_key=${this.apiKey}`;
    return this.http.get<any>(aUrl);
  }

  gettoprated(): Observable<any> {
    const aUrl = `${this.apiUrl}/tv/top_rated?api_key=${this.apiKey}`;
    return this.http.get<any>(aUrl);
  }

  getMoviebyId(id: number): Observable<any> {
    const Idurl = `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`;

    return this.http.get<any>(Idurl);
  }


}
