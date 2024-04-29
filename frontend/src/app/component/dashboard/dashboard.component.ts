import { Component, OnInit ,  } from '@angular/core';
import { FilterService } from 'src/app/service/filter.service';
import { MovieService } from 'src/app/service/movie.service';
import { SharedService } from 'src/app/service/shared.service';
import { Router, NavigationEnd,NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  Pmovies: any[] = [];
  topMovies :any[] = [];
  upcMovies :any[] = [];
  searchInput: string = '';
  searchInputSubscription: any;
  genres:any[] = [];

  constructor(private movieService: MovieService , private sharedService:SharedService ,private filterService:FilterService , private router:Router) {}

  ngOnInit(): void {

    this.searchInput = '';


    this.searchInputSubscription = this.sharedService.searchInput.subscribe(input => {
      this.searchInput = input;
    })

   this.loadOriginalContent();


   this.router.events.pipe(
    filter((event): event is NavigationStart | NavigationEnd => event instanceof NavigationStart || event instanceof NavigationEnd)
  ).subscribe((event: NavigationStart | NavigationEnd) => {
    if (event instanceof NavigationEnd && event.url !== '/movie') {
      this.searchInput = '';
      this.sharedService.searchInput.next('');
    }
  });

   this.filterService.getGenresMovie().subscribe( data =>{
    this.genres = data.genres.map((genre: any) => ({ id: genre.id, name: genre.name }));
   })
    
  }

  loadOriginalContent(): void {
    this.movieService.getPopularMovies().subscribe(
      (data: any) => {
        this.Pmovies = data.results.map((movie: any) => movie);
      },
      (error) => {
        console.error('Error fetching popular movies:', error);
      }
    );

    this.movieService.getTopMovies().subscribe(
      (data: any) => {
        this.topMovies = data.results.map((movie: any) => movie);
      },
      (error) => {
        console.error('Error fetching top rated movies:', error);
      }
    );

    this.movieService.getUpcoming().subscribe(
      (data: any) => {
        this.upcMovies = data.results.map((movie: any) => movie);
      },
      (error) => {
        console.error('Error fetching upcoming movies:', error);
      }
    );
  }

  getImageUrl(posterPath: string | null): string {
         return `https://image.tmdb.org/t/p/w500${posterPath}`;
        }

        filterByGenre(genre: string) {
    
          this.sharedService.genreSelect.next(genre);
        }


        ngOnDestroy(): void {
          this.searchInputSubscription.unsubscribe();
        }
     
  }

