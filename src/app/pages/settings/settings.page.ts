import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public name;
  public isprof;
  public buttonClickedNewND: boolean = false;
  public buttonClickedNewPWD: boolean = false;
  public changeName;
  public changePassword;

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController,
    public storage: Storage,
    ) { }

  async ngOnInit() {
    this.name = JSON.parse(await this.storage.get('name'));
    this.isprof = JSON.parse(await this.storage.get('isProf'));
  }

  goBack() {
    this.navCtrl.navigateBack("/nav/home");
  }

  disconnect() {
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

  public onButtonClickNewPWD() {
    this.buttonClickedNewPWD = !this.buttonClickedNewPWD;
  }

}
