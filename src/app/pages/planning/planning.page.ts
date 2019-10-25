import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController) { }

  ngOnInit() {
  }
}
