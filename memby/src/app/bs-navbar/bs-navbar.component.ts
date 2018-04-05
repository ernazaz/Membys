import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor( private auth: AuthService) {
    this.user$ = auth.authState;
   }
  
  logout(){
    this.auth.signOut();
  }
  ngOnInit() {
  }

}
