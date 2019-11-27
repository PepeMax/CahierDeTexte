import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.page.html',
  styleUrls: ['./homelogin.page.scss'],
})
export class HomeloginPage implements OnInit {

  constructor(
    public trans: TranslateService,
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
  }

  goLogin() {
    this.navCtrl.navigateRoot('/login')
  }

  registerAccount() {
    this.navCtrl.navigateRoot('/slides')
  }

}
