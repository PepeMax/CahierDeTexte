import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

//My service
import { AuthService } from 'src/app/services/auth.service';
import { enableDarkTheme } from 'src/app/components/helpers/utils';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public username;
  public status;
  public buttonClickedNewND: boolean = false;
  public darkMode: boolean;
  public isProf: boolean;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public toastController: ToastController,
    public storage: Storage,
    public trans: TranslateService,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    const auth = firebase.auth();
    const db = firebase.firestore();

    this.storage.get('valueDarkMode').then(value => this.darkMode = value);
    this.username = this.authService.getUserName();
    
    this.isProf = await this.storage.get('status');

    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get()
          .then(doc => {
            this.username = doc.data().name;
            this.status = doc.data().status;
          });
      }
    });
  }

  changeDarkMode() {
    this.storage.set('valueDarkMode', this.darkMode);
    enableDarkTheme(this.darkMode);
  }

  goBack() {
    this.navCtrl.navigateBack("/nav/home");
  }

  goAdmin() {
    this.navCtrl.navigateRoot("/planning");
  }

  async confirmSettings() {
    this.navCtrl.navigateBack('/nav/home')
    const toast = await this.toastController.create({
      message: this.trans.instant('SETTINGS.POPUP'),
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }

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

  public async changeName() {
    const alert = await this.alertController.create({
      header: this.trans.instant('SETTINGS.CHANGE_ND'),
      subHeader: this.trans.instant('SETTINGS.CHANGE_ND_SUB_HEADER') + this.username,
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: this.trans.instant('SETTINGS.USERNAME')
        }
      ],
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.trans.instant('COMMON.OK'),
          handler: (alertData) => {
            this.authService.updateProfile(alertData.username)
              .then(newuser => {
                this.username = newuser;
                console.log(alertData.username)
              });
          }
        }
      ]
    });
    await alert.present();
  }

  public async resetPassword() {
    const alert = await this.alertController.create({
      header: this.trans.instant('LOGIN.CHANGE_PASSWORD'),
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: this.trans.instant('LOGIN.PASSWORD')
        },
      ],
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.trans.instant('COMMON.OK'),
          handler: (alertData) => {
            this.authService.resetPassword(alertData.password)
          }
        }
      ]
    });
    await alert.present();
  }

}
