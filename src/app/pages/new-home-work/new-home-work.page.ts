import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { HomeWorkService } from 'src/app/services/home-work.service';

@Component({
  selector: 'app-new-home-work',
  templateUrl: './new-home-work.page.html',
  styleUrls: ['./new-home-work.page.scss'],
})
export class NewHomeWorkPage implements OnInit {

  today = new Date().toISOString();
  public homeworks;


  public name_homework: '';
  public type_homework: '';
  public fordate_homework: '';
  public infos_homework: ''


  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public storage: Storage,
    public firebase: FirebaseService,
    public homework: HomeWorkService
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.navCtrl.navigateForward("/nav/home")
  }

  getHomeWork() {
    this.homework.getHomeWork();
  }

  //Create new HomeWork
  createNewHomeWork() {
    var homeworksRef = firebase.firestore().collection("homeworks")

    homeworksRef.doc().set({
      name_homework: this.name_homework,
      type_homework: this.type_homework,
      givedate_homework: this.today,
      fordate_homework: this.fordate_homework,
      infos_homework: this.infos_homework
    });

    this.presentToast();
    this.cancel();

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.trans.instant('COMMON.FIREBASE_ADD_HOME-WORK_SUCCESFULLY'),
      duration: 2000
    });
    toast.present();
  }

}
