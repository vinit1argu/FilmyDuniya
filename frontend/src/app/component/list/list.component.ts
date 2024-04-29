import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/service/list.service';
import { MovieService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  likedMovies: any[] = [];
  movie: any[]=[];
  likedTv: any[] = [];
  tv: any[] = [];

  constructor(private listService: ListService , private movieService:MovieService ,private tvService:TvService) { }

  ngOnInit(): void {
    this.getLikedMovies();
    this.getLikedTvSeries();

  }

  getLikedMovies(): void {
    this.listService.getLikedMovies().subscribe(
      response => {
        this.likedMovies = response;
        // console.log(this.likedMovies);
        this.fetchMovieDetails();
      },
      error => {
        console.error(error); 
      }
    );
  }

  getLikedTvSeries(): void {
    this.listService.getLikedTVSeries().subscribe(
      response => {
        this.likedTv = response;
        // console.log(this.likedTv);
        this.fetchTvDetails();
      },
      error => {
        console.error(error); 
      }
    );
  }

  fetchMovieDetails(): void {
    for (const id of this.likedMovies) {
      this.movieService.getMoviebyId(id).subscribe(
        data => {
          this.movie.push(data);
          // console.log(data);
        },
        error => {
          console.error(error); 
        }
      );
    }
  }

  fetchTvDetails():void {

    for (const id of this.likedTv) {
      this.tvService.getMoviebyId(id).subscribe(
        result => {
          this.tv.push(result);
          // console.log(result);
        },
        error => {
          console.error(error); 
        }
      );
    }
  }

  getImageUrl(posterPath: string | null): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
   }

}
