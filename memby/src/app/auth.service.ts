import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  authState: any = null;
  user$: Observable<firebase.User>;
  uid;
 
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) { 
    this.user$ = afAuth.authState;
  
  }
  signUpWithEmail(email: string, password: string, form) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.db.object('companies_registration/'+ user.uid).set({
          email: email,
          username: form.username,
          company_code: form.companycode,
          address: form.address,
          phone: form.phonenumber,
        });
        return this.uid = user.uid;
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.router.navigateByUrl(returnUrl);

      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
  }


}
