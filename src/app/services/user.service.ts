import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentsService } from './components.service';

import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public navCtrl: NavController,
    private componentsServ: ComponentsService,
    private trans: TranslateService,
  ) { }

  public userID;
  public userInfo;

  getUserName() {
    console.log(firebase.auth().currentUser)
    this.userInfo = JSON.stringify(firebase.auth().currentUser);
    this.userInfo = JSON.parse(this.userInfo)
    return this.userInfo.displayName
  }

  returnIsProf(): boolean { 
    let isProf = false;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(doc => {
            var status = doc.data().status;
            if (status === "student") {
              isProf = false;
            } else if (status === "professor") {
              isProf = true;
            };
          });
      } else {
        this.componentsServ.createAllert(this.trans.instant('ERRORS.ERROR_DISCONNECT_1'), this.trans.instant('ERRORS.ERROR_DISCONNECT_2'))
        this.navCtrl.navigateRoot('/homelogin');
        isProf = false
      };
    });
    return isProf;
  }

  returnIsNewUser() {
    this.userInfo = JSON.stringify(firebase.auth().currentUser);
    this.userInfo = JSON.parse(this.userInfo)
    if (this.userInfo.emailVerified == false) {
      return true
    } else {
      return false
    }
  }

}
