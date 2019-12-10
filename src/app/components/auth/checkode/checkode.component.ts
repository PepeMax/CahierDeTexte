import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

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

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.modalCtrl.dismiss("modalCreateUser");
  }

  checkCode() {
    if (this.code == 3322) {
      this.navCtrl.navigateRoot("nav/home");
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

}
