
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendingService } from 'src/app/service/trending.service';

@Component({
  selector: 'app-persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.css']
})
export class PersondetailComponent implements OnInit  {


  id: any ;
  tperson: any;

  constructor(private route: ActivatedRoute, private trendingService:TrendingService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.trendingService.getPersonbyId(this.id).subscribe(result=>{
        this.tperson = result;
      });
  })

}

  getImageUrl(posterPath: string | null): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  rounded(voteAverage: number): number {
    return Math.floor(voteAverage);
  }

  homepage() {
    const url = this.tperson.homepage;
    window.open(url,'_blank');
  }

  islink(){
    return this.tperson.homepage.length > 0;
  }
}
