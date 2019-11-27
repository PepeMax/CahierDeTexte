import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController,

  ) { }

  ngOnInit() {}

  async affichelamodal() {
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps: {
        message: {
          button: {
            validate: 'COMMON.OK'
          },
          content: 'CONTRIBUTION_PAGE.POP_UP_RETURN_PAYMENT'
        }
      },
      cssClass: 'alert-modal',
    });
  }

}
