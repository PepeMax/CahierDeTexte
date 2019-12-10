import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

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
    private storage: Storage

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
      case "si2":
        this.whoas = this.trans.instant("NEWHOMEWORK.SI2")
        break;
      case "si3":
        this.whoas = this.trans.instant("NEWHOMEWORK.SI3")
        break;
      case "si4":
        this.whoas = this.trans.instant("NEWHOMEWORK.SI4")
        break;
      case "ppe1":
        this.whoas = this.trans.instant("NEWHOMEWORK.PPE1")
        break;
      case "ppe2":
        this.whoas = this.trans.instant("NEWHOMEWORK.PPE2")
        break;
      case "emd1":
        this.whoas = this.trans.instant("NEWHOMEWORK.EMD1")
        break;
      case "emd2":
        this.whoas = this.trans.instant("NEWHOMEWORK.EMD2")
        break;
      case "mathsalgo":
        this.whoas = this.trans.instant("NEWHOMEWORK.MATHSALGO")
        break;
      case "maths":
        this.whoas = this.trans.instant("NEWHOMEWORK.MATHS")
        break;
      case "anglais":
        this.whoas = this.trans.instant("NEWHOMEWORK.ANGLAIS")
        break;
      case "français":
        this.whoas = this.trans.instant("NEWHOMEWORK.FRANCAIS")
        break;
      default:
        break;
    }
  }

  async createNewProfessor() {
    const db = firebase.firestore();

    const email = await this.storage.get('email');
    const password = await this.storage.get('password');
    const name = this.whoas;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db.collection('profs').doc(cred.user.uid).set({
          email: email,
          password: password,
          name: name
        })
      });
  }

  //this.navCtrl.navigateRoot("nav/home");


  foncion() {
    console.log(firebase.firestore().collection('users'))

  }

}
