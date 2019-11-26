import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public username;
  public isprof;
  public buttonClickedNewND: boolean = false;
  public email;

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController,
    public storage: Storage,
    public alertController : AlertController,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    // this.username = this.authService.getInfoUser();
    this.isprof = JSON.parse(await this.storage.get('isProf'));

  }

  goBack() {
    this.navCtrl.navigateBack("/nav/home");
  }

  disconnect() {
    this.authService.logout();
    this.navCtrl.navigateRoot("/login");
  }

  goAdmin() {
    this.navCtrl.navigateRoot("/planning");
  }

  async confirmSettings() {
    this.navCtrl.navigateBack('/nav/home')
    const toast = await this.toastController.create({
      message: this.trans.instant('SETTINGS.POPUP'),
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }

  public async changeName() {
    const alert = await this.alertController.create({
      header: this.trans.instant('SETTINGS.CHANGE_ND'),
      subHeader: this.trans.instant('SETTINGS.CHANGE_ND_SUB_HEADER') + this.username,
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: this.trans.instant('SETTINGS.USERNAME')
        }
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
            this.authService.updateProfile(alertData.username)
            .then(newuser => {
              this.username = newuser;
            });
          }
        }
      ]
    });
    await alert.present();
  }

  public resetPassword(mail) {
    this.authService.resetPassword(mail);
  }

}
