import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { SearchService } from 'src/app/service/search.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchInput: string = '';

  searchResults:any[]=[]; 
  topMovies :any[] = [];

  searchInputSubscription: any;

  constructor(private searchService: SearchService, private sharedService: SharedService,private movieService:MovieService) {}

  ngOnInit(): void {
    this.searchInputSubscription = this.sharedService.searchInput.subscribe(input => {
      this.searchInput = input;
      this.searchMovies();
    })

    this.movieService.getTopMovies().subscribe(
      (data:any) => {
        this.topMovies = data.results.map((movie: any) => movie);
        
      },
      (error) => {
        console.error('Error fetching now playing movies:', error);
      }
    );
  }

  searchMovies() {
    if (this.searchInput) {
      this.searchService.getSearchedMovie(this.searchInput).subscribe(
        (response) => {
         this.searchResults = response.results.map((movie: any) => movie);
          // console.log(this.searchResults);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
    }
  }


  

  getImageUrl(posterPath: string | null): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
   }

   ngOnDestroy(): void {
     this.searchInputSubscription.unsubscribe();
   }

}