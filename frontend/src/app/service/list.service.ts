import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiUrl = 'http://localhost:3002/auth';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  addToMyList(movieId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.post<any>(`${this.apiUrl}/add`, { movieId }, options);
  }

  removeFromMyList(movieId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.delete<any>(`${this.apiUrl}/remove/${movieId}`, options);
  }

  addTvToMyList(seriesId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.post<any>(`${this.apiUrl}/add-tv`, { seriesId }, options);
  }

  removeTvFromMyList(seriesId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.delete<any>(`${this.apiUrl}/remove-tv/${seriesId}`, options);
  }

  getLikedMovies(): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.get<any>(`${this.apiUrl}/liked-movies`, options);
  }

  getLikedTVSeries(): Observable<any> {
    const headers = this.getAuthHeaders();
    const options = { headers: headers };
    return this.http.get<any>(`${this.apiUrl}/liked-tv`, options);
  }
}
