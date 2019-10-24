import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-home-work',
  templateUrl: './new-home-work.page.html',
  styleUrls: ['./new-home-work.page.scss'],
})
export class NewHomeWorkPage implements OnInit {

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
  ) { }

  Fonction2() {
    this.navCtrl.navigateForward("/planning")
  }

  ngOnInit() {
  }

}
