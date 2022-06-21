import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApi: FetchApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  
    
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets favorite movies from api call and sets the favorite movies variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApi.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * checks if a movie is included in the user's list of favorite movies
   * @param id 
   * @returns true, if the movie is a favorite move, else false
   */
  isFav(id: string): boolean {
    return this.movies.includes(id)
    // return false;
  }

  /**
  * opens the user genre dialog from GenreComponent to displaying details
  * @param name
  * @param description
  */
   openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
  * opens the user director dialog from DirectorComponent to displaying details
  * @param name
  * @param bio
  * @param birthday
  */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
  //  * @param title
  //  * @param description
  //  */
  // openSynopsisDialog(title: string, description: string): void {
  //   this.dialog.open(SynopsisComponent, {
  //     data: {
  //       Title: title,
  //       Description: description,
  //     },
  //     // Assign dialog width
  //     width: '500px'
  //   });

  // }

  /**
   * adds a movie to the list of favorite movies via an API call
   * @param id 
   * @function addFavoriteMovie
   */
  addToFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApi.addFavoriteMovies(id).subscribe((result:any) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id 
   * @function removeFavoriteMovie
   */
   deleteFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApi.deleteFavoriteMovies(id).subscribe((result:any) => {
      console.log(result);
      this.ngOnInit();
    })
  }

}
