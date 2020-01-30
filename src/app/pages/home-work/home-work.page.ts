import { Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from 'src/app/services/firebase.service';
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
  public badge;

  constructor(
    public trans: TranslateService,
    public firebase: FirebaseService,
    public navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.getHomeworks()
  }

  doRefresh(val) {
    setTimeout(() => {
      val.target.complete();
    }, 2000);
    this.tab_homeworks = [];
    this.getHomeworks();
  }

  public buttonClickedgmod: boolean = false;
  public onButtonClickgmod() {
    this.buttonClickedgmod = !this.buttonClickedgmod;
  }

  async getHomeworks() {
    firebase.firestore().collection("homeworks").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tab_homeworks.push(doc.data());
        });
        this.badge = this.tab_homeworks.length;
        this.storage.set('badge', this.badge)
      });
  }

}
