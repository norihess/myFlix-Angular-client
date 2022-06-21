import { Component, OnInit } from '@angular/core';
import { LoginViewComponent } from '../login-view/login-view.component';
import { RegistrationViewComponent } from '../registration-view/registration-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(RegistrationViewComponent, {
      width: '280px'
    });
  }
openUserLoginDialog(): void {
    this.dialog.open(LoginViewComponent, {
      width: '280px'
    });
  }
openMoviesDialog(): void {
    this.dialog.open(MovieViewComponent, {
      width: '680px'
    });
  }
}
