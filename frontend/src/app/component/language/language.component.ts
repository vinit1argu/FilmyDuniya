import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language.service';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit{
  languageName: string = '';
  languageCode: string = '';
  error: string = '';
  languageMovies: any[] = [];

  constructor(private languageService: LanguageService) { }


  ngOnInit(): void {
    this.languageName = this.languageService.getEnteredLanguageName();
    if (this.languageName) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.languageService.setEnteredLanguageName(this.languageName.trim());
    this.languageService.getLanguageCode(this.languageName.trim()).subscribe(code => {
      this.languageCode = code;
      if (!code) {
        this.error = 'Language not found';
      } else {
        this.error = '';
        this.languageCode = code;
        this.languageService.getMoviesByLanguage(this.languageCode).subscribe(data => {
          this.languageMovies = data.results.map((movie: any) => movie);
          console.log(this.languageMovies);
         
        }, error => {
          console.error('Error fetching movies:', error);
        });
      }
    });
  }


  getImageUrl(posterPath: string | null): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
   }

   capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
