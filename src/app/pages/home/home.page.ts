import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public name;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController,
    public storage: Storage,
  ) { }

  async ngOnInit() {
    this.name = JSON.parse(await this.storage.get('name'));
  }

  goSettings() {
    this.navCtrl.navigateForward("/settings")
  }

}
