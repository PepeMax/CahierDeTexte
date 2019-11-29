import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { ComponentsService } from 'src/app/services/components.service';
import { UserService } from 'src/app/services/user.service';

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
    public storage: Storage,
    public alertController: AlertController,
    public menu: MenuController,
    //Services
    private authService: AuthService,
    private userService: UserService,
    private handleError: HandleErrorService,
    private components: ComponentsService
  ) { }

  ngOnInit() {
    this.authService.signOutUser();
  }

  async logProf() {
    const alert = await this.alertController.create({
      header: this.trans.instant('LOGIN.LOGPROF'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: this.trans.instant('LOGIN.MAIL')
        },
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
            this.storage.set('isProf', true);
            this.authService.signInUser(alertData.email, alertData.password)
              .then(() => {
                if (this.userService.returnIsProf() == true) {
                  if (this.userService.returnIsNewUser() == true) {
                    this.navCtrl.navigateRoot('/slides')
                  }
                  this.userService.getUserName();
                  this.navCtrl.navigateRoot('/nav/home')
                  this.components.createLoading(this.trans.instant('COMMON.WAITING'))
                  this.components.createToast(this.trans.instant('LOGIN.MSG_PROF'));
                } else {
                  this.components.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
                  this.authService.signOutUser();
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
            this.authService.signInUser(alertData.email, alertData.password)
              .then(() => {
                if (this.userService.returnIsProf() == false) {
                  this.userService.getUserName();
                  this.navCtrl.navigateRoot('/nav/home')
                  this.components.createLoading(this.trans.instant('COMMON.WAITING'))
                  this.components.createToast(this.trans.instant('LOGIN.MSG_STUDENT'));
                } else {
                  this.components.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_NOT_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
                  this.authService.signOutUser();
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

  goRegister(){
    this.navCtrl.navigateRoot('/slides');
    this.menu.close();
  }

}
