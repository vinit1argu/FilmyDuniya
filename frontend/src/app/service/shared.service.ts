import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  
  public searchInput = new BehaviorSubject<string>("");

  public genreSelect = new BehaviorSubject<string>("");

}
