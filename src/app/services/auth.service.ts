import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import { HandleErrorService } from './handle-error.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ComponentsService } from 'src/app/services/components.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public storage: Storage,
    public handleError: HandleErrorService,
    public alertController: AlertController,
    public trans: TranslateService,
    public navCtrl: NavController,
    public components : ComponentsService
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

  resetPassword(password) {
    firebase.auth().currentUser.updatePassword(password)
      .then(() => {
        this.components.createToast(this.trans.instant("COMMON.RESET_PASSWORD_SUCCESSFUL"));
      })
      .catch((error) => {
        this.components.createToast(this.trans.instant("COMMON.RESET_PASSWORD_FAIL"));
      });
  }

  resetPasswordWithEmail(email) {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      this.components.createToast(this.trans.instant("COMMON.RESET_PASSWORD_WITH_EMAIL"));
    })
    .catch((error) => {
      this.components.createToast(this.trans.instant("COMMON.RESET_PASSWORD_FAIL"))
    });
  }

  async updateProfile(newUser): Promise<any> {
    var user = firebase.auth().currentUser;

    let email = await this.storage.get("email");
    // let email2 = JSON.parse(this.storage.get("email"));

    console.log(email);
    // console.log(email2);

    firebase.firestore().collection('users').doc(user.uid).set({
      email: email,
      name: newUser,
      status: this.storage.get("status"),
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