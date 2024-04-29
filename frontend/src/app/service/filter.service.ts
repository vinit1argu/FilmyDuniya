import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private apiKey = '1a8f23eb94b9216ecdb70d4339407156';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getGenresMovie(): Observable<any> {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getGenresTv(): Observable<any> {
    const url = `${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`;
    return this.http.get(url);
  }

  getTvByGenre(genreId:number): Observable<any> {
    const url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${genreId}`;
    return this.http.get(url);
  }
}
