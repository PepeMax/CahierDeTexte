import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public storage: Storage,
    public handleErr: HandleErrorService
  ) { }

  public erreur;
  public userID;

  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  userDetails() {
    this.userID = JSON.stringify(firebase.auth().currentUser);
    this.userID = JSON.parse(this.userID)
    console.log(this.userID.uid)
    // switch (this.userID.uid) {

    //   case "auth/invalid-email": {
    //     console.log("mail invalide")
    //     break;
    //   }
    //   case "auth/user-not-found": {
    //     console.log("utiliseur ntrouvable"); 
    //     break;
    //   }
    //   default: {
    //     break;
    //   }

    // }
  }

  logout() {
    firebase.auth().signOut();
  }

  resetPassword(mail) {
    firebase.auth().sendPasswordResetEmail(mail)
      .then(() => {
        console.log("envoyé");
      })
      .catch((error) => {
        console.log(this.handleErr.handleError(error))
      });
  }
}
