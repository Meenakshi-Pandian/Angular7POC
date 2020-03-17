import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movies } from '../movies-model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = '/assets/data/movies.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.url).pipe(
      catchError(err => {
        return throwError(err.message);
      })
    );
  }

}
