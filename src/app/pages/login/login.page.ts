import { Component, OnInit } from '@angular/core';
import {NavController, MenuController, ToastController} from '@ionic/angular';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public menu: MenuController, public trans: TranslateService, 
    public toastController: ToastController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  goHome(){
    this.navCtrl.navigateRoot('/nav/home');
    this.menu.enable(true);
    this.menu.close();
  }

  async confirmLoginStudent(){
    this.navCtrl.navigateBack('/nav/home')
    const toast = await this.toastController.create({
      message: 'Eh bienvenue wesh',
      duration: 2000
    });
    toast.present();
  }

    async confirmLoginProf(){
      this.navCtrl.navigateBack('/nav/home')
      const toast = await this.toastController.create({
        message: 'Bienvenue professeur !',
        duration: 2000
      });
      toast.present();
  }
}
