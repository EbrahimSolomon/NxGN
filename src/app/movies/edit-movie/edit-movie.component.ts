import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie!: Movie;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      throw new Error('Invalid movie ID.');
    }

    const movieId = +id;
    
    this.http.get<{ data: Movie, message: string, success: boolean }>(`http://localhost:5148/api/movies/${movieId}`).subscribe(
    response => {
        console.log('Received data:', response);
        if (response.success && response.data && response.data.movieId) {
            this.movie = response.data;
        } else {
            console.error('Error fetching movie: Invalid data', response);
            alert('Failed to fetch movie. Please try again later.');
        }
    },
      error => {
        console.error('Error fetching movie:', error);
        alert('Failed to fetch movie. Please try again later.');
      }
    );
  }
  onSave() {
    console.log(this.movie);
    this.http.put(`http://localhost:5148/api/movies/${this.movie.movieId}`, this.movie).subscribe(
      () => {
        alert('Movie updated successfully!');
        this.router.navigate(['/movies']);
      },
      error => {
        console.error('Error updating movie:', error);
        alert(`Failed to update movie. Reason: ${error.message || 'Unknown error'}`);
      }      
    );
  }
  onCancel() {
    this.router.navigate(['/movies']);
  }
  
}
