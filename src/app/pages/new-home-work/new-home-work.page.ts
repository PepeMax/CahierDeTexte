import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-home-work',
  templateUrl: './new-home-work.page.html',
  styleUrls: ['./new-home-work.page.scss'],
})
export class NewHomeWorkPage implements OnInit {
  
  today = new Date().toISOString();

  public newHomeWork: any = {
    name_homework: '',
    type_homework: '',
    givedate_homework: '',
    fordate_homework: '',
    infos_homework: ''
  }
  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public storage: Storage,
    public firebase: FirebaseService
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.navCtrl.navigateForward("/nav/home")
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'L&apos;événement à bien été ajouté',
      duration: 2000
    });
    toast.present();
  }

  async submit() {
    let oldEvents: any[] = JSON.parse(await this.storage.get('events'));

    if (oldEvents !== null) {
      oldEvents.push(this.newHomeWork);
    } else {
      oldEvents = [];
      oldEvents.push(this.newHomeWork);
    }

    await this.storage.set('events', JSON.stringify(oldEvents))
      .then(events => {
        console.log(events);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.presentToast();
        this.cancel();
      });
    let events: any[] = JSON.parse(await this.storage.get('events'));
    this.firebase.AddEventsOnServer(events);
  }

}
