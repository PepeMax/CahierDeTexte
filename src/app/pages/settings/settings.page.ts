import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public name;
  public isprof;
  public buttonClickedNewND: boolean = false;
  public changeName;
  public email;

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController,
    public storage: Storage,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.name = JSON.parse(await this.storage.get('name'));
    this.isprof = JSON.parse(await this.storage.get('isProf'));
    this.email = JSON.parse(await this.storage.get('email'));

  }

  goBack() {
    this.navCtrl.navigateBack("/nav/home");
  }

  disconnect() {
    this.authService.logout();
    this.navCtrl.navigateRoot("/login");
    this.storage.clear();
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

  public onButtonClickNewND() {
    this.buttonClickedNewND = !this.buttonClickedNewND;
  }

  public resetPassword(mail) {
    this.authService.resetPassword(mail);
  }

}
