import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Movie } from '../app/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL = 'http://localhost:5148/api/movies/';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map((response: any) => { // <-- specify type here
        if (response.success && Array.isArray(response.data)) {
          return response.data;
        }
        throw new Error('Data format not recognized');
      }),
      catchError(error => {
        console.error('Error fetching movies:', error);
        return throwError(error);
      })
    );
  }
}
