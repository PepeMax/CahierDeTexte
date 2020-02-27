import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, PopoverController } from '@ionic/angular';
import { InfoslyceeComponent } from 'src/app/components/popover/infoslycee/infoslycee.component';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.page.html',
  styleUrls: ['./homelogin.page.scss'],
})
export class HomeloginPage implements OnInit {

  constructor(
    public trans: TranslateService,
    private navCtrl: NavController,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
  }

  goLogin() {
    this.navCtrl.navigateRoot('/login')
  }

  registerAccount() {
    this.navCtrl.navigateRoot('/slides')
  }

  async showInfos() {
    const popover = await this.popoverController.create({
      component: InfoslyceeComponent,
      animated: false,
      translucent: true
    });
    return await popover.present();
  }

}

