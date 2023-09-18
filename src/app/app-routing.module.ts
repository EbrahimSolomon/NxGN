import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { GroupedMoviesComponent } from './grouped-movies/grouped-movies.component';
import { MovieCategoryReportComponent } from './movie-category-report/movie-category-report.component';


const routes: Routes = [
  // ... other routes
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'grouped-movies', component: GroupedMoviesComponent },
  { path: 'movie-category-report', component: MovieCategoryReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


