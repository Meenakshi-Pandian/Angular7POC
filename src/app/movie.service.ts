import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movies } from '../movies-model';
import { map, startWith, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url = '/assets/data/movies.json';
  private sampleTitle = 'Titanic';
  constructor(private http: HttpClient) { }

  getMovie(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.url).pipe(
      catchError(err => {
        return throwError(err.message);
      })
    );
  }

}
