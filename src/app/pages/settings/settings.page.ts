import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

//My service
import { AuthService } from 'src/app/services/auth.service';
import { enableDarkTheme } from 'src/app/components/helpers/utils';

import * as firebase from 'firebase/app';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  //User
  public username;
  public status: Boolean;
  
  public language;
  
  public buttonClickedNewND: Boolean = false;
  
  public darkMode: Boolean;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public toastController: ToastController,
    public storage: Storage,
    public trans: TranslateService,
    private authService: AuthService,
    private app: AppComponent,
  ) { }

  async ngOnInit() {
    this.language = await this.storage.get('language');
    const auth = firebase.auth();
    const db = firebase.firestore();

    this.storage.get('valueDarkMode').then(value => this.darkMode = value);

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

  navigateEmailUser() {
    this.navCtrl.navigateForward('/email-user')
  }

  changeLanguage() {
    this.app.changeLanguage(this.language);
  }

}

