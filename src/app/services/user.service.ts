import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public userID;
  public userInfo;

  userDetails() {
    this.userID = JSON.stringify(firebase.auth().currentUser);
    this.userID = JSON.parse(this.userID)
    console.log(this.userID.uid)
  }

  getInfoUser() {
    return this.userInfo.params
  }

  getUserName() {
    console.log(firebase.auth().currentUser)
    this.userInfo = JSON.stringify(firebase.auth().currentUser);
    this.userInfo = JSON.parse(this.userInfo)
    return this.userInfo.displayName
  }

  returnIsProf() {
    this.userInfo = JSON.stringify(firebase.auth().currentUser);
    this.userInfo = JSON.parse(this.userInfo)
    if (this.userInfo.photoURL === "#") {
      return true
    } else {
      return false
    }
  }

  returnIsNewUser() {
    this.userInfo = JSON.stringify(firebase.auth().currentUser);
    this.userInfo = JSON.parse(this.userInfo)
    if (this.userInfo.emailVerified == false) {
      return true
    } else {
      return false
    }
  }
}
