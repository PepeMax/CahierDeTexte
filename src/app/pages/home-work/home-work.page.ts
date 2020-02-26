import { Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

  public homeworks;
  public tab_homeworks = [];
  public all_homeworks = [];
  public badge;
  private today = new Date().toISOString();
  public display_all_homework = false;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    private storage: Storage,
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
    this.all_homeworks = [];
    this.getHomeworks();
  }

  async getHomeworks() {
    firebase.firestore().collection("homeworks").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().fordate_homework > this.today) {
            this.tab_homeworks.push(doc.data());
          }
          this.all_homeworks.push(doc.data());
        });
        this.tab_homeworks.sort(this.compareDate);
        this.all_homeworks.sort(this.compareDate);
        if (this.display_all_homework == false) {
          this.badge = this.tab_homeworks.length;
        } else {
          this.badge = this.all_homeworks.length;
        }
        this.storage.set('badge', this.badge)
      });
  }

  display_last_homework() {
    if (this.display_all_homework == false) {
      this.display_all_homework = true;
    } else if (this.display_all_homework == true) {
      this.display_all_homework = false;
    };
    if (this.display_all_homework == false) {
      this.badge = this.tab_homeworks.length;
    } else {
      this.badge = this.all_homeworks.length;
    }
    this.storage.set('badge', this.badge)
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
