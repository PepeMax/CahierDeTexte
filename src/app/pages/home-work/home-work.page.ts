import { Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

  public homeworks;
  public tab_homeworks = [];
  public badge;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    private storage: Storage,
    private notifs: NotificationsService
  ) {
  }

  ngOnInit() {
    this.getHomeworks();
  }

  doRefresh(val) {
    setTimeout(() => {
      val.target.complete();
    }, 2000);
    this.tab_homeworks = [];
    this.getHomeworks();
  }

  async getHomeworks() {
    firebase.firestore().collection("homeworks").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tab_homeworks.push(doc.data());
        });
        this.tab_homeworks.sort(this.compareDate);
        this.badge = this.tab_homeworks.length;
        this.storage.set('badge', this.badge)
      });
      this.notifs.notif_NewHomeWork();
  }

  public compareDate(a, b) {
    let d1 = new Date(a.fordate_homework);
    let d2 = new Date(b.fordate_homework);

    if (d1.getTime() > d2.getTime()) {
      return 1
    }
    if (d1.getTime() < d2.getTime()) {
      return -1
    }
    return 0
  }

}
