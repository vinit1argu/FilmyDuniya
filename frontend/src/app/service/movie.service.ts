import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '1a8f23eb94b9216ecdb70d4339407156';

  constructor(private http: HttpClient) { }
  
  getPopularMovies(): Observable<any> {
    const popularUrl = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<any>(popularUrl);
  }

  getTopMovies(): Observable<any> {
    const topUrl = `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`;
    return this.http.get<any>(topUrl);
  }

  getUpcoming(): Observable<any> {
    const upcomingUrl = `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get<any>(upcomingUrl);
  }
  
  getMoviebyId(id: number): Observable<any> {
    const Idurl = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`;

    return this.http.get<any>(Idurl);
  }

}
