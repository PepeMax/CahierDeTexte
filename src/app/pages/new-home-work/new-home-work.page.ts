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
  public homeworks;

  public newHomeWork: any = {
    name_homework: '',
    type_homework: '',
    givedate_homework: this.today,
    fordate_homework: '',
    infos_homework: ''
  }

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public storage: Storage,
    public firebase: FirebaseService,
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.navCtrl.navigateForward("/nav/home")
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.trans.instant('COMMON.FIREBASE_ADD_HOME-WORK_SUCCESFULLY'),
      duration: 2000
    });
    toast.present();
  }

  async submit() {

    let oldHomework: any[] = JSON.parse(await this.storage.get('homework'));
    if (oldHomework !== null) {
      oldHomework.push(this.newHomeWork);
    } else {
      oldHomework = [];
      oldHomework.push(this.newHomeWork);
    }

    await this.storage.set('homework', JSON.stringify(oldHomework))
      .then(homework => {
        console.log(homework);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.presentToast();
        this.cancel();
      });
    let homework: any[] = JSON.parse(await this.storage.get('homework'));
    this.firebase.addOnFireBase(homework);
  }

}
