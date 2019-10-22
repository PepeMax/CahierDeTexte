import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,

  ) { }

  ngOnInit() {
  }

  goSettings() {
    this.navCtrl.navigateForward("/settings")
  }

}
