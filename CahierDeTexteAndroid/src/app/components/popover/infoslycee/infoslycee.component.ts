import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-infoslycee',
  templateUrl: './infoslycee.component.html',
  styleUrls: ['./infoslycee.component.scss'],
})
export class InfoslyceeComponent implements OnInit {

  constructor(
    public trans: TranslateService,
    public alertController: AlertController,
    private callNumber: CallNumber,

  ) { }

  ngOnInit() { }

  async contact() {
    const alert = await this.alertController.create({
      header: this.trans.instant('HOME.CALL_CFA'),
      message: this.trans.instant('HOME.CONFIRM_CALL_CFA'),
      buttons: [
        {
          text: this.trans.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.trans.instant('HOME.CALL'),
          handler: () => {
            this.callNumber.callNumber("0556917342", true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        }
      ]
    });
    await alert.present();
  }
}
