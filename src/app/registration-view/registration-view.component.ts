import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})

export class RegistrationViewComponent implements OnInit {
  @Input() userData = {Username: '', Password: '', Birthday: '', Email: ''}
  //  @Input() userCredentials = {Username: '', Password: '', Bir}

  constructor(
    public fetchApi: FetchApiService,
    public dialogRef: MatDialogRef<RegistrationViewComponent>,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }
    
  ngOnInit(): void {
  }

  registerUser(): void {
    this.fetchApi.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open( response , 'OK', {
        duration: 2000
      });
    });
  }

}
