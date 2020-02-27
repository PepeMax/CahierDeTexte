import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isProf: boolean;
  public badge;

  constructor(
    private storage: Storage,
  ) { }

  async ngOnInit() {
    this.isProf = await this.storage.get('status');
    this.badge = await this.storage.get('badge');
    setInterval(async () => { this.badge = await this.storage.get('badge'); }, 1000);
  }


}
