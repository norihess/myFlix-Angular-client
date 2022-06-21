import { Component } from '@angular/core';
import { RegistrationViewComponent } from './registration-view/registration-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieViewComponent } from './movie-view/movie-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
// This is the function that will open the dialog when the signup button is clicked  
openUserRegistrationDialog(): void {
    this.dialog.open(RegistrationViewComponent, {
// Assigning the dialog a width
    width: '280px'
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieViewComponent, {
      width: '600px',
      height: '500px'
    });
  }

}