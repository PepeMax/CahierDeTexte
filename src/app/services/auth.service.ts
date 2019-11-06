import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register() {

  }

  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  userDetails() {
    return firebase.auth().currentUser; 
  }

  logout() {
    firebase.auth().signOut;
  }

}
