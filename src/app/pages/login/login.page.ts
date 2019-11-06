import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toatsvalue = this.trans.instant('ACCOUNT_REQUEST.REGISTER_REQUEST');

  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public alertController: AlertController,
    public toastController: ToastController,
    public storage: Storage,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.storage.clear();
  }

  login(email, password) {
    this.authService.login(email, password)
            .then(res => {
              console.log(res);
              this.errorMessage = "";
              this.navCtrl.navigateRoot('/nav/home')
            }, err => {
              this.errorMessage = err.message;
            })
  }

  logout() {
    this.authService.logout()
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
            this.storage.set('name', JSON.stringify(alertData.name));
            this.storage.set('pwd', JSON.stringify(alertData.password));
            this.storage.set('isProf', true);            
            this.login(alertData.email, alertData.password);            
            this.okRegister(this.trans.instant('LOGIN.MSG_PROF'));
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
            this.storage.set('name', JSON.stringify(alertData.email));
            this.storage.set('pwd', JSON.stringify(alertData.password));
            this.storage.set('isProf', false);
            this.login(alertData.email, alertData.password);
            this.okRegister(this.trans.instant('LOGIN.MSG_STUDENT'));
          }
        }
      ]
    });
    await alert.present();
  }

}
