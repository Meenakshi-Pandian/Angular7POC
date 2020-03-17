import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies = [];
  public errorMsg = '';

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.moviesService.getMovies()
        .subscribe((data: any) => {
          this.movies = data.movies;
          this.movies = this.movies.map(movie => {
            return {
            ...movie,
            poster: movie.poster ? movie.poster.replace(movie.poster.split('images/')[0], 'https://m.media-amazon.com/') : ''
            };
          });
          },
          error => this.errorMsg = error
          );
  }

  onMovieSelect(movieId) {
    this.router.navigate(['/movie/' , movieId]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onFilterSelect(value) {

    this.movies = this.movies.sort((a, b) => {
      if (value === 'latest') {
        return b.year - a.year;
      } else if (value === 'oldest') {
        return a.year - b.year;
      } else if (value === 'rated') {
        return b.imdb.rating - a.imdb.rating;
      } else if (value === 'ascending') {
        return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0;
      } else if (value === 'descending') {
        return (b.title < a.title) ? -1 : (b.title > a.title) ? 1 : 0;
      }
    });
  }

}
