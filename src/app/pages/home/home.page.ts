import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public nameProf;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public storage: Storage,

  ) { }

  async ngOnInit() {
    this.nameProf = JSON.parse(await this.storage.get('nameProf'));
  }

  goSettings() {
    this.navCtrl.navigateForward("/settings")
  }

}
