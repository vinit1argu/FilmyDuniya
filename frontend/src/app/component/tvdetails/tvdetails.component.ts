import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListService } from 'src/app/service/list.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tvdetails',
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css']
})
export class TvdetailsComponent implements OnInit {


  id: any ;
  movie: any;

  constructor(private route: ActivatedRoute, private tvService:TvService , private listService:ListService ,private toastr :ToastrService) { }

  ngOnInit(): void {

  this.route.params.subscribe(params => {
    this.id = params['id']; 
    this.tvService.getMoviebyId(this.id).subscribe(result=>{
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

  isSame(){
    return this.movie.name==this.movie.original_name;
  }

  watchMovie() {
  }
  
  addToMyTvList(seriesId: number): void {
    this.listService.addTvToMyList(seriesId).subscribe(
      response => {
        // console.log(response); 
        this.toastr.success('Added to My List', 'Successfully Added');
      },
      error => {
        this.toastr.error('Already Added','Error Adding to My List');
      }
    );
  }
  
  removeFromMyTvList(seriesId: number): void {
    this.listService.removeTvFromMyList(seriesId).subscribe(
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
