import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { Router } from '@angular/router';
// import { DuckDuckGoResponse } from '../models/duckduckgo-response.model';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit { 
  constructor(private http: HttpClient, private router: Router) {}

  searchText: string = '';
  searchType: string = 'name';

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  private readonly apiUrl = 'http://localhost:5148/api/movies/';
  // private readonly DUCKDUCKGO_API_ENDPOINT = 'https://api.duckduckgo.com/?q=';
  // private TMDB_API_ENDPOINT = 'https://api.themoviedb.org/3/search/movie?api_key=IneedAnAccount&query=';
  private OMDB_API_ENDPOINT = 'http://www.omdbapi.com/?apikey=dc8cb17&t=';

  ngOnInit(): void {
    this.fetchMovies();
  }
  fetchImageForMovie(movieName: string): void {
    const apiUrl = `${this.OMDB_API_ENDPOINT}${movieName}`;
  
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
                this.filterMovies();
            } else if (response.success) {
                console.error('Expected movies to be in an array format inside the "data" field, but got:', response);
            } else {
                console.error('Error fetching movies:', response.message);
            }
        },
        error => {
            console.error('HTTP Error fetching movies:', error);
        }
    );
}

  onSearchChange(): void {
    console.log('Search text:', this.searchText);
    console.log('Search type:', this.searchType);
    this.filterMovies();
  }

 getFloor(value: number): number {
  return Math.floor(value);
}

getCeil(value: number): number {
  return Math.ceil(value);
}

filterMovies(): void {
  if (this.searchText === '') {
    this.filteredMovies = [...this.movies];
    return;
  }

  switch (this.searchType) {
    case 'name':
      this.filteredMovies = this.movies.filter(movie => 
        movie.movieName.toLowerCase().includes(this.searchText.toLowerCase()));
      break;
    case 'category':
      this.filteredMovies = this.movies.filter(movie => 
        movie.movieCategory.toLowerCase().includes(this.searchText.toLowerCase()));
      break;
    default:
      this.filteredMovies = [...this.movies];
  }
}
  onAddMovie() {
    console.log('Add Movie button clicked');
    this.router.navigate(['/movies/add']);
  }

  onEditMovie(index: number) {
    const movieId = this.movies[index].movieId;
    
    console.log(`Edit Movie button clicked for movie with ID: ${movieId}`);
    
    this.router.navigate(['/edit-movie', movieId]);
  }
  
  onDeleteMovie(index: number) {
    if (confirm("Are you sure you want to delete this movie?")) {
        const movieId = this.movies[index].movieId;
        this.http.delete(`${this.apiUrl}${movieId}`).subscribe(
            () => {
                // Remove from movies array
                this.movies.splice(index, 1);

                // Update filteredMovies array as well
                this.filterMovies();
            },
            error => {
                console.error('Error deleting movie:', error);
                alert('Failed to delete movie. Please try again later.');
            }
        );
    }
}
}
 
