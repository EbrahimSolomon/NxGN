import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie :  Movie ={
    movieId: 0,
    movieName: '',
    movieCategory: '',
    movieRating: 0,
    movieDescription: '',
    movieImageUrl: ''
};

constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    console.log(this.movie);
    this.http.post('http://localhost:5148/api/movies', this.movie).subscribe(
      () => {
        alert('Movie added successfully!');
        this.router.navigate(['/movies']);
      },
      error => {
        console.error('Error adding movie:', error);
        alert('Failed to add movie. Please try again later.');
      }
    );
  }

  onCancel() {
    // Navigate back to the movies listing page
    this.router.navigate(['/movies']);
  }
}