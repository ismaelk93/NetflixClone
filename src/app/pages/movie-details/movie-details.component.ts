import {Component, OnInit} from '@angular/core';
import {MovieApiServiceService} from "../../service/movie-api-service.service";
import {ActivatedRoute} from "@angular/router";
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private service: MovieApiServiceService,
              private router: ActivatedRoute,
              private title: Title,
              private meta: Meta) {
  }

  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;


  ngOnInit() {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }


  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;

      this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
      this.meta.updateTag({name: 'title', content: this.getMovieDetailResult.original_title});
      this.meta.updateTag({name: 'description', content: this.getMovieDetailResult.overview});

      // facebook
      this.meta.updateTag({property: 'og:type', content: "website"});
      this.meta.updateTag({property: 'og:url', content: ``});
      this.meta.updateTag({property: 'og:title', content: this.getMovieDetailResult.original_title});
      this.meta.updateTag({property: 'og:description', content: this.getMovieDetailResult.overview});
      this.meta.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`
      });
    })
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getmovievideo#');
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = result.key;
        }
      })
    })
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'getmoviecast#');
      this.getMovieCastResult = result.cast;
    })
  }
}
