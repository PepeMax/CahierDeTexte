import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PlanningPage } from '../planning/planning.page';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public storage: Storage,
    private authService: AuthService,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private callNumber: CallNumber,
    private planning: PlanningPage,
    private fcm: FCM,
    public plt: Platform
  ) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });
        this.fcm.onTokenRefresh().subscribe(token => {
        });
      })
  }
  ngOnInit() {
    this.modalCtrl.dismiss(null, null, "modalCheckCode")
    this.planning.downloadPDF();
  }

  goSettings() {
    this.navCtrl.navigateForward('/settings')
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

  async contact() {
    const alert = await this.alertController.create({
      header: this.trans.instant('HOME.CALL_CFA'),
      message: this.trans.instant('HOME.CONFIRM_CALL_CFA'),
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.trans.instant('HOME.CALL'),
          handler: () => {
            this.callNumber.callNumber("0556917342", true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        }
      ]
    });
    await alert.present();

  }

  navigateEmailUser() {
    this.navCtrl.navigateForward('/email-user')
  }

}
