import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkode',
  templateUrl: './checkode.component.html',
  styleUrls: ['./checkode.component.scss'],
})
export class CheckodeComponent implements OnInit {

  public nbChances: number = 3;
  public lastChance: boolean = false;
  public code: number;
  public errorMessage: string;
  public codeChecked: boolean = false;
  public whoas;
  
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private trans: TranslateService,

  ) { }

  ngOnInit() {
    this.modalCtrl.dismiss("modalCreateUser");
  }

  checkCode() {
    if (this.code == 3322) {
      this.codeChecked = true;
    } else {
      this.nbChances--;
      this.errorMessage = "Code faux, réessayer";
      if (this.nbChances == 1) {
        this.lastChance = true;
      }
      if (this.nbChances == 0) {
        this.navCtrl.navigateRoot("/homelogin");
      }
    }
  }

  nameProf() {
    switch (this.whoas) {
      case "si1":
        this.whoas = this.trans.instant("NEWHOMEWORK.SI1")
        break;
    
      default:
        break;
    }
  }

  // createNewProfessor() {
  //   firebase.auth().createUserWithEmailAndPassword(email, password).then(
  // }

        //this.navCtrl.navigateRoot("nav/home");


  foncion() {
    console.log(firebase.firestore().collection('users'))

  }

}
