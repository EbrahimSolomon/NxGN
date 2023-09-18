import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { FormsModule } from '@angular/forms';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { GroupedMoviesComponent } from './grouped-movies/grouped-movies.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MovieCategoryReportComponent } from './movie-category-report/movie-category-report.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    AddMovieComponent,
    EditMovieComponent,
    GroupedMoviesComponent,
    MovieCategoryReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
