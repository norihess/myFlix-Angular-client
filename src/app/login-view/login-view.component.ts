import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})

export class LoginViewComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApi: FetchApiService,
    public dialogRef: MatDialogRef<LoginViewComponent>,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }
    
  ngOnInit(): void {
  }
  
  login(): void {
    this.fetchApi.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // Close the modal on success
      console.log(result);
      // Add token and username to local Storage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);

      // Redirect to movies (main) page
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
//   login():void {
//     this.fetchApi.userLogin(this.userData).subscribe(
//       (result:any) => {
//         this.dialogRef.close();
//         localStorage.setItem('token', result.Token)
//         localStorage.setItem('user', result.user.Username)
//         this.snackBar.open('Login successful', 'Login', {
//           duration: 2000
//         })  
//          // Redirect to movies (main) page
//            this.router.navigate(['movies']);     
//       },
//       (err:any) => {
//         this.snackBar.open('Login unsuccessful, try again', 'Login', {
//           duration: 2000
//         })
//       }
//     )
//   }

// }
