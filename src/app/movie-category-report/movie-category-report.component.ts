import { Component, OnInit  } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../models/movie.model';


@Component({
  selector: 'app-movie-category-report',
  templateUrl: './movie-category-report.component.html',
  styleUrls: ['./movie-category-report.component.css']
})
export class MovieCategoryReportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions?: Highcharts.Options;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.chartOptions = this.transformMovieDataToChartOptions(movies);
    });
  }

  private transformMovieDataToChartOptions(movies: Movie[]): Highcharts.Options {
    const categoryCounts = movies.reduce<Record<string, number>>((counts, movie) => {
      counts[movie.movieCategory] = (counts[movie.movieCategory] || 0) + 1;
      return counts;
    }, {});

    const data = Object.entries(categoryCounts).map(([category, count]) => [category, count]);

    return {
      series: [{
        type: 'pie',
        data: data
      }]
    };
  }
}
