import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Movies } from 'src/movies-model';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.sass']
})
export class MovieDetailComponent implements OnInit {

  public errorMsg = '';
  public movieId = '';
  public selectedMovie = [];
  public movies = [];

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.movieId = param.get('movieid');
    });
    this.moviesService.getMovies()
    .subscribe(
      (data: any) => {
        this.movies = data.movies;
        this.selectedMovie = this.movies.filter(movie => {
          return movie._id === this.movieId;
        });
        this.selectedMovie[0].poster = this.selectedMovie[0].poster ?
        this.selectedMovie[0].poster.replace(this.selectedMovie[0].poster.split('images/')[0], 'https://m.media-amazon.com/') : '';
      },
      error => this.errorMsg = error
    );

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
