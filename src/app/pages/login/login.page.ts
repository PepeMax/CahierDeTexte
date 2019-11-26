import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
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
    private handleError: HandleErrorService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.storage.clear();
    this.authService.logout();
  }

  async createToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'toast',
    });
    toast.present();
  }

  async createAllert(textheader, textmessage) {
    const alert = await this.alertController.create({
      header: textheader,
      message: textmessage,
      buttons: ['OK']
    });
    await alert.present();
  }

  async createLoading(textmessage, css?) {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      duration: 2500,
      message: textmessage,
      cssClass: css,
    })
    return await loading.present();
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
            this.storage.set('isProf', true);
            this.authService.login(alertData.email, alertData.password)
              .then(() => {
                if (this.authService.returnIsProf() == true) {
                  this.authService.getUserName();
                  this.navCtrl.navigateRoot('/nav/home')
                  this.createLoading(this.trans.instant('COMMON.WAITING'))
                  this.createToast(this.trans.instant('LOGIN.MSG_PROF'));
                } else {
                  this.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
                  this.authService.logout();
                }
              })
              .catch(async err => {
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
            this.storage.set('isProf', true);
            this.authService.login(alertData.email, alertData.password)
              .then(() => {
                if (this.authService.returnIsProf() == false) {
                  this.authService.getUserName();
                  this.navCtrl.navigateRoot('/nav/home')
                  this.createLoading(this.trans.instant('COMMON.WAITING'))
                  this.createToast(this.trans.instant('LOGIN.MSG_STUDENT'));
                } else {
                  this.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_NOT_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
                  this.authService.logout();
                }
              })
              .catch(async err => {
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
