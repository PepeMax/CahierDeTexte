import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { UserService } from 'src/app/services/user.service';

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
    private authService : AuthService,
    private userService: UserService,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
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
            this.authService.signOutUser();
            this.navCtrl.navigateRoot("/homelogin");
          }
        }
      ]
    });
    await alert.present();
  }

  GetUserInfos() {
    this.userService.getInfoUser()
  }

  ChangeID() {
    var user = firebase.auth().currentUser;
    return user.updateProfile({
      photoURL: "#"
    })
  }

  goSettings(){
    this.navCtrl.navigateRoot('/settings');
  }

}
