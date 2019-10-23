import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    public toastController: ToastController) { }

  ngOnInit() {
  }

  async okRegister(val) {
    const toast = await this.toastController.create({
      message: val,
      duration: 2000,
      cssClass: 'test',
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
            console.log('set mail');
            let str = "Nom : " + alertData.name + "<br>";
            str += "Mot de passe : " + alertData.password + "<br>";
            console.log(JSON.stringify(alertData));
            this.okRegister(this.trans.instant('LOGIN.MSG_PROF'));
            this.navCtrl.navigateForward('/nav/home');
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
            console.log('set mail');
            let str = "Nom : " + alertData.name + "<br>";
            str += "Mot de passe : " + alertData.password + "<br>";
            console.log(JSON.stringify(alertData));
            this.okRegister(this.trans.instant('LOGIN.MSG_STUDENT'));
            this.navCtrl.navigateForward('/nav/home');
          }
        }
      ]
    });
    await alert.present();
  }

}
