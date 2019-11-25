import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';


import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public name;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public storage: Storage,
    public auth: AuthService 
  ) { }

  async ngOnInit() {
  }

  async goSettings() {
    this.navCtrl.navigateForward("/settings")

  }

  GetUserInfos() {
    this.auth.getInfoUser()
  }

  ChangeID() {
    var user = firebase.auth().currentUser;
    return user.updateProfile({
      photoURL: "#"
    })
  }

}
