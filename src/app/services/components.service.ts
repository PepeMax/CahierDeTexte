import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,

  ) { }

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
}

