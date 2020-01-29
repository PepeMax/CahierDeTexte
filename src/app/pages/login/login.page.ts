import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController, ModalController, } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { SigninProfComponent } from 'src/app/components/auth/signinprof/signinprof.component';
import { SigninStudentComponent } from 'src/app/components/auth/signinstudent/signinstudent.component';

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
    private modalCtrl: ModalController,
    //Services
    private authService: AuthService,


  ) { }

  ngOnInit() {
    this.authService.signOutUser();
  }

  async signInStud() {
    const alert = await this.modalCtrl.create({
      component: SigninStudentComponent,
      id: "signInStud",
      componentProps: {
        message: {
          button: {
            validate: 'COMMON.OK'
          },
          content: 'CONTRIBUTION_PAGE.POP_UP_RETURN_PAYMENT'
        }
      },
      cssClass: 'alert-modal',
    });
    alert.present();
    this.modalCtrl.dismiss('signInStud');
  }

  async signInProf() {
    const alert = await this.modalCtrl.create({
      component: SigninProfComponent,
      id: "signInProf",
      componentProps: {
        message: {
          button: {
            validate: 'COMMON.OK'
          },
          content: 'CONTRIBUTION_PAGE.POP_UP_RETURN_PAYMENT'
        }
      },
      cssClass: 'alert-modal',
    });
    alert.present();
    this.modalCtrl.dismiss('signInProf');
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

  goRegister() {
    this.navCtrl.navigateRoot('/slides');
  }

}
