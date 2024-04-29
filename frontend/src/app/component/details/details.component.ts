import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListService } from 'src/app/service/list.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit  {

  id: any ;
  movie: any;

  constructor(private route: ActivatedRoute, private movieService:MovieService,private listService:ListService , private toastr:ToastrService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.movieService.getMoviebyId(this.id).subscribe(result=>{
        this.movie = result;
      });
  })


}

  getImageUrl(posterPath: string | null): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  rounded(voteAverage: number): number {
    return Math.floor(voteAverage);
  }

  watchMovie() {
  }

  addToMyList(movieId: number): void {
    this.listService.addToMyList(movieId).subscribe(
      response => {
        // console.log(response); 
        this.toastr.success('Added to My List', 'Successfully Added');
      },
      error => {
        this.toastr.error('Already Added','Error Adding to My List');
      }
    );
  }

  removeFromMyList(movieId: number): void {
    this.listService.removeFromMyList(movieId).subscribe(
      response => {
        // console.log(response); 
        this.toastr.success('Removed from My List', 'Successfully Removed');
      },
      error => {
        // console.error(error);
        this.toastr.error('Not Found in My List', 'Error Removing');
      }
    );
  }
}
