import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public navCtrl: NavController,

    ) { }

  ngOnInit() {
  }

  goHome() {
    this.navCtrl.navigateRoot("/nav/home");
  }

}
