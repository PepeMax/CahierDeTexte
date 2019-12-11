import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isProf: boolean;

  constructor(
    private navCtrl: NavController,
    private userServ: UserService,
  ) {}

  ngOnInit() {
    this.isProf = this.userServ.returnIsProf();
  }

}
