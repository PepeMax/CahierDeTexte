import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public name;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public storage: Storage,
    public auth : AuthService,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
  }

  async goSettings() {
    this.navCtrl.navigateForward("/settings")
  }  
  async disconnect() {
    const alert = await this.alertController.create({
      header: this.trans.instant('HOME.DISCONNECT'),
      message: this.trans.instant('HOME.CONFIRM_DISCONNECT'),
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.trans.instant('COMMON.VALIDATE'),
          handler: () => {
            this.navCtrl.navigateRoot("/login");
            this.auth.signOutUser();
          }
        }
      ]
    });
    await alert.present();
  }

  GetUserInfos() {
    this.auth.returnIsProf()
  }

  ChangeID() {
    var user = firebase.auth().currentUser;
    return user.updateProfile({
      photoURL: "#"
    })
  }
}
