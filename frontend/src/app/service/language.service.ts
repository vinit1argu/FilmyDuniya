import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private enteredLanguageName: string = '';

  setEnteredLanguageName(languageName: string): void {
    this.enteredLanguageName = languageName;
  }

  getEnteredLanguageName(): string {
    return this.enteredLanguageName;
  }

  private apiKey = '1a8f23eb94b9216ecdb70d4339407156';
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';

  private languageCodeMap: { [key: string]: string } = {
    'english': 'en',
    'spanish': 'es',
    'french': 'fr',
    'german': 'de',
    'italian': 'it',
    'russian': 'ru',
    'chinese': 'zh',
    'japanese': 'ja',
    'arabic': 'ar',
    'portuguese': 'pt',
    'hindi': 'hi',
    'bengali': 'bn',
    'urdu': 'ur',
    'korean': 'ko',
    'turkish': 'tr',
    'dutch': 'nl',
    'greek': 'el',
    'swedish': 'sv',
    'danish': 'da',
    'norwegian': 'no',
    'polish': 'pl',
    'finnish': 'fi',
    'hebrew': 'he',
    'hungarian': 'hu',
    'thai': 'th',
    'czech': 'cs',
    'filipino': 'fil',
    'indonesian': 'id',
    'malay': 'ms',
    'vietnamese': 'vi',
    'ukrainian': 'uk',
    'romanian': 'ro',
    'slovak': 'sk',
    'slovenian': 'sl',
    'croatian': 'hr',
    'serbian': 'sr',
    'bulgarian': 'bg',
    'lithuanian': 'lt',
    'latvian': 'lv',
    'estonian': 'et',
    'icelandic': 'is',
    'georgian': 'ka',
    'armenian': 'hy',
    'albanian': 'sq',
    'macedonian': 'mk',
    'belarusian': 'be',
    'bosnian': 'bs',
    'kazakh': 'kk',
    'kyrgyz': 'ky',
    'tajik': 'tg',
    'turkmen': 'tk',
    'uzbek': 'uz',
    'afrikaans': 'af',
    'amharic': 'am',
    'azerbaijani': 'az',
    'basque': 'eu',
    'gujarati': 'gu',
    'kannada': 'kn',
    'khmer': 'km',
    'lao': 'lo',
    'marathi': 'mr',
    'mongolian': 'mn',
    'nepali': 'ne',
    'odia': 'or',
    'pashto': 'ps',
    'punjabi': 'pa',
    'sinhala': 'si',
    'somali': 'so',
    'tamil': 'ta',
    'telugu': 'te',
    'tigrinya': 'ti',
    'uighur': 'ug',
    'welsh': 'cy',
    'yoruba': 'yo',
    'zulu': 'zu'
  };

  constructor(private http:HttpClient) { }

  getLanguageCode(languageName: string): Observable<string> {
    const languageCode = this.languageCodeMap[languageName.toLowerCase()];
    return of(languageCode || '');
  }

  getMoviesByLanguage(languageCode: string): Observable<any> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&language=${languageCode}&with_original_language=${languageCode}`;
    return this.http.get(url);

}

}
