
import { Injectable, OnInit } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class AppServiceService implements OnInit{
 public affichage : boolean = true;
 public affichageHome : boolean = true;

 
  constructor() { }
  ngOnInit(): void {
    }


}

  


