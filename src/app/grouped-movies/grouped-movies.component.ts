import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-grouped-movies',
  templateUrl: './grouped-movies.component.html',
  styleUrls: ['./grouped-movies.component.css']
})

export class GroupedMoviesComponent implements OnInit {
  
  movies: Movie[] = [];
  groupedMovies: { [rating: number]: Movie[] } = {};
  private readonly apiUrl = 'http://localhost:5148/api/movies/';
  private OMDB_API_ENDPOINT = 'http://www.omdbapi.com/?apikey=dc8cb17&t=';

  constructor(private http: HttpClient) {
    this.selectedRating = 0;
  }

  ngOnInit(): void {
    this.fetchMovies();
  }
  fetchImageForMovie(movieName: string): void {
    const apiUrl = `${this.OMDB_API_ENDPOINT}${encodeURIComponent(movieName)}`;
  
    this.http.get<any>(apiUrl).subscribe(
        response => {
            const movieImageUrl = response?.Poster;
            if (movieImageUrl && movieImageUrl !== "N/A") {
                const movie = this.movies.find(m => m.movieName === movieName);
                if (movie) {
                    movie.movieImageUrl = movieImageUrl;
                }
            } else {
                console.log('No image available for this movie');
            }
        },
        error => {
            console.error('Error fetching image:', error);
        }
    );
}

fetchMovies(): void {
  this.http.get<any>(this.apiUrl).subscribe(
      response => {
          if (response.success && Array.isArray(response.data)) {
              this.movies = response.data;
              this.movies.forEach(movie => {
                  if (!movie.movieImageUrl) {
                      this.fetchImageForMovie(movie.movieName);
                  }
              });
              this.groupByRating();
          } else {
              console.error('Error fetching movies:', response.message);
          }
      },
      error => {
          console.error('HTTP Error fetching movies:', error);
      }
  );
}


  groupByRating(): void {
    for (let movie of this.movies) {
      const rating = Math.floor(movie.movieRating);
      if (!this.groupedMovies[rating]) {
        this.groupedMovies[rating] = [];
      }
      this.groupedMovies[rating].push(movie);
    }
  }

  getObjectKeys(obj: { [key: number]: Movie[] }): number[] {
    return Object.keys(obj).map(key => +key); 
  }

  getFloor(value: number): number {
    return Math.floor(value);
  }

  getCeil(value: number): number {
    return Math.ceil(value);
  }

  generateCSV(movies: Movie[]): string {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(movies[0]);
    let csv = movies.map(row => 
    header.map(fieldName => JSON.stringify((row as any)[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    return csv.join('\r\n');
}

downloadCSV(): void {
  const csvData = this.generateCSV(this.movies);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'movie_report.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

selectedRating: number;
moviesForSelectedRating: Movie[] = [];

showMoviesForRating(rating: number): void {
  this.selectedRating = rating;
  this.moviesForSelectedRating = this.groupedMovies[rating];
}
}

