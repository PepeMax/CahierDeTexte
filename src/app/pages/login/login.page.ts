import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';

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
    private authService: AuthService,
    private handleError: HandleErrorService
  ) { }

  ngOnInit() {
    this.storage.clear();
  }

  login(email, password, msg) {
    this.authService.login(email, password)
      .then(res => {
        console.log(res);
        this.navCtrl.navigateRoot('/nav/home')
        this.createToast(this.trans.instant(msg));
      }, async err => {
        const alert = await this.alertController.create({
          header: this.trans.instant('COMMON.ERROR'),
          message: this.handleError.handleError(err) + this.trans.instant('LOGIN.ERROR_MESSAGE'),
          cssClass: 'error_login',
          buttons: ['OK']
        });
        await alert.present();
      })
  }

  async createToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
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
          name: 'email',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.MAIL')
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
          }
        }, {
          text: this.trans.instant('COMMON.OK'),
          handler: (alertData) => {
            this.storage.set('email', JSON.stringify(alertData.email));
            this.storage.set('pwd', JSON.stringify(alertData.password));
            this.storage.set('isProf', true);
            this.login(alertData.email, alertData.password, 'LOGIN.MSG_PROF');
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
          name: 'email',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.MAIL')
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
          }
        }, {
          text: this.trans.instant('COMMON.OK'),
          handler: (alertData) => {
            this.storage.set('email', JSON.stringify(alertData.email));
            this.storage.set('pwd', JSON.stringify(alertData.password));
            this.storage.set('isProf', false);
            this.login(alertData.email, alertData.password, 'LOGIN.MSG_STUDENT');
          }
        }
      ]
    });
    await alert.present();
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: this.trans.instant('LOGIN.CHANGE_PASSWORD'),
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: this.trans.instant('LOGIN.MAIL')
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
            this.authService.resetPassword(alertData.email)
          }
        }
      ]
    });
    await alert.present();
  }

}
