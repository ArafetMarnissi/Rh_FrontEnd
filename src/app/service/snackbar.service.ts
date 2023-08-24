import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
   // this.snackBar.openFromComponent(CustomSnackBarComponent,{duration:5000,panelClass: ['green-snackbar'],horizontalPosition:'left',verticalPosition: 'top',});
    let panelClass = [];

    if (action === "error") {
      panelClass = ['green-snackbar'];
    } else {
      panelClass = ['green-snackbar'];
    }

    this.snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top', // Position en haut de la page
      panelClass : ['green-snackbar'],
      duration: 3000,
      
    });
  }
}
