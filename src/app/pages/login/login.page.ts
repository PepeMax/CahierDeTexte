import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toatsvalue = this.trans.instant('ACCOUNT_REQUEST.REGISTER_REQUEST');

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public alertController: AlertController,
    public toastController: ToastController,
    public storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.clear();

  }

  async okRegister(val) {
    const toast = await this.toastController.create({
      message: val,
      duration: 2000,
      cssClass: 'toast',
    });
    toast.present();
  }

  async logProf() {
    const alert = await this.alertController.create({
      header: this.trans.instant('LOGIN.LOGPROF'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.USERNAME')
        },
        {
          name: 'password',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.PASSWORD')
        },
      ],
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annulé');
          }
        }, {
          text: this.trans.instant('COMMON.OK'),
          handler: (alertData) => {
            this.storage.set('name', JSON.stringify(alertData.name));
            this.storage.set('pwd', JSON.stringify(alertData.password));
            this.storage.set('isProf', true);            
            console.log(alertData.name);
            console.log(alertData.password);
            this.okRegister(this.trans.instant('LOGIN.MSG_PROF'));
            this.navCtrl.navigateForward('/nav/home')
          }
        }
      ]
    });
    await alert.present();
  }

  async logStud() {
    const alert = await this.alertController.create({
      header: this.trans.instant('LOGIN.LOGSTUD'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.USERNAME')
        },
        {
          name: 'password',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.PASSWORD')
        },
      ],
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annulé');
          }
        }, {
          text: this.trans.instant('COMMON.OK'),
          handler: (alertData) => {
            this.storage.set('name', JSON.stringify(alertData.name));
            this.storage.set('pwd', JSON.stringify(alertData.password));
            this.storage.set('isProf', false);
            console.log(alertData.name);
            console.log(alertData.password);
            this.okRegister(this.trans.instant('LOGIN.MSG_STUDENT'));
            this.navCtrl.navigateForward('/nav/home');
          }
        }
      ]
    });
    await alert.present();
  }

}
