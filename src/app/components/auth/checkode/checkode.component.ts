import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkode',
  templateUrl: './checkode.component.html',
  styleUrls: ['./checkode.component.scss'],
})
export class CheckodeComponent implements OnInit {

  public errorMessage1: string;
  public errorMessage2: string;
  public lastChance: boolean = false;
  public codeChecked: boolean = false;
  public nbChances: number = 3;
  public code: number;
  public whoas;

  constructor(
    private navCtrl: NavController,
    private trans: TranslateService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private handleErr: HandleErrorService,
    private authService: AuthService

  ) { }

  ngOnInit() {
  }

  checkCode() {
    if (this.code == 3322) {
      this.codeChecked = true;
    } else {
      this.nbChances--;
      this.errorMessage1 = "Code faux, réessayer";
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
    const status = await this.storage.get('status');
    const name = this.whoas;

    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      spinner: "crescent",
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          email: email,
          password: password,
          name: name,
          status: status
        }).then(() => {
          this.authService.signInUser(email, password)
            .then(() => {
              this.navCtrl.navigateRoot("nav/home");
              loading.dismiss();
            }).catch((error) => {
              this.errorMessage2 = this.handleErr.handleError(error);
              loading.dismiss();
            });
        });
      }).catch((error) => {
        this.errorMessage2 = this.handleErr.handleError(error);
        loading.dismiss();
      });
  }

}
