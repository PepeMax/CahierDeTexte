import { Component, OnInit } from '@angular/core';
import {NavController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public menu: MenuController,     public trans: TranslateService,) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  goHome(){
    this.navCtrl.navigateRoot('/nav/home');
    this.menu.enable(true);
    this.menu.close();
  }

  
}
