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

  getUserName() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(doc => {
            return doc.data().name;
          });
      }
    });
  }

  getEmail() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(doc => {
            return doc.data().email;
          });
      }
    });
  }
  
  getStatus() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(doc => {
            return doc.data().status;
          });
      }
    });
  }

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
    this.navCtrl.navigateRoot('/login');
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

    firebase.firestore().collection('users').doc(user.uid).set({
      email: this.getEmail,
      name: newUser,
      status: this.getStatus,

    }).then(() => {
      return newUser;
    }).catch(async err => {
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