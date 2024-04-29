import { Component,OnInit, } from '@angular/core';
import { TrendingService } from 'src/app/service/trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {



  trendingPerson: any[] = [];
  tMovies :any[] = [];
  trendingTv :any[] = [];

  constructor(private trendingService: TrendingService) { }

  ngOnInit(): void {

    this.trendingService.getperson().subscribe(
      (data:any) => {
        this.trendingPerson = data.results.map((movie: any) => movie);
         
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );


    this.trendingService.getmovie().subscribe(
      (data:any) => {
        this.tMovies = data.results.map((movie: any) => movie);
        
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );


    this.trendingService.getTv().subscribe(
      (data:any) => {
        this.trendingTv= data.results.map((movie: any) => movie);
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );
    
    
  }

  getImageUrl(posterPath: string | null): string {
         return `https://image.tmdb.org/t/p/w500${posterPath}`;
        }
  }


