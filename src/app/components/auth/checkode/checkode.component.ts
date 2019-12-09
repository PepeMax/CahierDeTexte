import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  ) { }

  ngOnInit() { }

  checkCode() {
    if (this.code == 3322) {

    } else {
      this.nbChances--
      this.errorMessage = "Code faux, réessayer"
      if (this.nbChances == 1) {
        this.lastChance = true;
      }
      if (this.nbChances == 0) {
        this.navCtrl.navigateRoot("/login");
      }
    }

  }

}
