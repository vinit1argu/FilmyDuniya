import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/service/filter.service';
import { SharedService } from 'src/app/service/shared.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{

  selectedGenre: string = "";
  movieGenre:any[]=[]; 
  tvGenre:any[]=[]; 
  genreInputSubscription: any;
  mg:any[]=[];
  tg:any[]=[];

  constructor(private sharedService:SharedService, private filterService:FilterService){}

  ngOnInit(): void {
      
    // this.fetchgenremovie();
    // this.fetchgenretv();


    const movieGenres$ = this.filterService.getGenresMovie();
    const tvGenres$ = this.filterService.getGenresTv();

    combineLatest([movieGenres$, tvGenres$]).subscribe(([movieData, tvData]) => {
      this.mg = movieData.genres.map((genre: any) => ({ id: genre.id, name: genre.name }));
      this.tg = tvData.genres.map((genre: any) => ({ id: genre.id, name: genre.name }));

    this.genreInputSubscription  = this.sharedService.genreSelect.subscribe(input => {
      this.selectedGenre = input;
      // console.log(this.selectedGenre);
      this.moviebyGenre();
      this.tvbyGenre();

   });
  });
}

  //  fetchgenremovie(){
  //    this.filterService.getGenresMovie().subscribe((data)=>{
  //    this.mg = data.genres.map((genre: any) => ({ id: genre.id, name: genre.name }));
  //   });
  // }

  // fetchgenretv(){
  //   this.filterService.getGenresTv().subscribe((data)=>{
  //     this.tg = data.genres.map((genre: any) => ({ id: genre.id, name: genre.name }));
  //   })
  // }

  moviebyGenre(){

    const selectedGenreObject = this.mg.find(genre => genre.name === this.selectedGenre);
    // console.log(selectedGenreObject);

    if(selectedGenreObject){
      this.filterService.getMoviesByGenre(selectedGenreObject.id).subscribe((data:any)=>{
        this.movieGenre = data.results.map((movie: any) => movie);
        // console.log(this.movieGenre);
        
      })
    }
    

  }

  tvbyGenre(){
    const selectedGenreObject = this.tg.find(genre => genre.name === this.selectedGenre);
    // console.log(selectedGenreObject);
    
    if (selectedGenreObject) {
      this.filterService.getTvByGenre(selectedGenreObject.id).subscribe((data: any) => {
        this.tvGenre = data.results.map((movie: any) => movie);
        // console.log(this.tvGenre);
      });
    }
  
  }

  getImageUrl(posterPath: string | null): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
   }

 
  ngOnDestroy(): void {
    this.genreInputSubscription.unsubscribe();
  }

}
