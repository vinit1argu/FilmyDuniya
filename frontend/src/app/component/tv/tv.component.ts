import { Component, OnInit ,  } from '@angular/core';
import { FilterService } from 'src/app/service/filter.service';
import { SharedService } from 'src/app/service/shared.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  ontheairMovies :any[] = [];
  populartvMovies :any[] = [];
  topRatedMovies :any[] = [];
  genres:any[] = [];

  constructor(private tvService:TvService , private filterService:FilterService , private sharedService:SharedService){ }

  ngOnInit(): void {
   
    this.tvService.getOntheAir().subscribe(
      (data:any) => {
        this.ontheairMovies = data.results.map((movie: any) => movie);
        
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );


    this.tvService.getPopular().subscribe(
      (data:any) => {
        this.populartvMovies = data.results.map((movie: any) => movie);
        
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );
    
    this.tvService.gettoprated().subscribe(
      (data:any) => {
        this.topRatedMovies = data.results.map((movie: any) => movie);
        
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );

    this.filterService.getGenresTv().subscribe( data =>{
      this.genres = data.genres.map((genre: any) => ({ id: genre.id, name: genre.name }));
     })
    
  }

  getImageUrl(posterPath: string | null): string {
         return `https://image.tmdb.org/t/p/w500${posterPath}`;
        }

        filterByGenre(genre: string) {
    
          this.sharedService.genreSelect.next(genre);
        }

  }

