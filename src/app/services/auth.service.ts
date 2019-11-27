import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import { HandleErrorService } from './handle-error.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public storage: Storage,
    public handleError: HandleErrorService,
    public alertController: AlertController,
    public trans: TranslateService,
    public navCtrl: NavController
  ) { }

  public erreur;
  public userID;
  public userInfo;

  signInUser(email: string, password: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            resolve();
          },
            (error) => {
              reject(error);
            });
      });
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
}

  signOutUser() {
    firebase.auth().signOut();
  }

  userDetails() {
    this.userID = JSON.stringify(firebase.auth().currentUser);
    this.userID = JSON.parse(this.userID)
    console.log(this.userID.uid)

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


  //Change user's settings

  resetPassword(mail) {
    firebase.auth().sendPasswordResetEmail(mail)
      .then(() => {
        console.log("envoyé");
      })
      .catch((error) => {
        console.log(this.handleError.handleError(error))
      });
  }

  async updateProfile(newUser): Promise<any> {
    var user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: newUser
    })
      .then(() => {
        return newUser;
      })
      .catch(async err => {
        const alert = await this.alertController.create({
          header: this.trans.instant('COMMON.ERROR'),
          message: this.handleError.handleError(err) + this.trans.instant('LOGIN.ERROR_MESSAGE'),
          cssClass: 'error_login',
          buttons: ['OK']
        });
        await alert.present();
      });
  }
}