import { Component, OnInit } from '@angular/core';
import { FetchApiService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})

export class UserViewComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApi: FetchApiService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApi.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  /**
   * opens the edit profile dialog from EditUserComponent to allow user to edit their details
   */
   openEditUser(): void {
    this.dialog.open(EditUserComponent, {
      width: '500px',
      panelClass: 'edit-user-custom',
    });
  }

  /**
   * deletes the user profile, redirects to welcome screen
   * @function deleteUser
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApi.deleteUser().subscribe((result:any) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
