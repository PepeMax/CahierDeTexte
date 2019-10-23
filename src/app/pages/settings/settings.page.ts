import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  goHome() {
    this.navCtrl.navigateRoot("/nav/home");
  }

  Fonction1() {
    this.navCtrl.navigateForward("/login")
  }

  goAdmin() {
    this.navCtrl.navigateRoot("/planning");
  }

  async confirmSettings() {
    this.navCtrl.navigateBack('/nav/home')
    const toast = await this.toastController.create({
      message: 'C\'est carré chef',
      duration: 2000
    });
    toast.present();
  }

  public buttonClickedNewND: boolean = false;
  public onButtonClickNewND() {
    this.buttonClickedNewND = !this.buttonClickedNewND;
  }

  public buttonClickedNewPWD: boolean = false;
  public onButtonClickNewPWD() {
    this.buttonClickedNewPWD = !this.buttonClickedNewPWD;
  }

}
