import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = '1a8f23eb94b9216ecdb70d4339407156';

  constructor(private http: HttpClient) { }

  getSearchedMovie(searchQuery: string): Observable<any> {

    
    const url = `${this.apiUrl}?api_key=${this.apiKey}&page=1&query=${searchQuery}`;
    return this.http.get<any>(url);

  }
}
