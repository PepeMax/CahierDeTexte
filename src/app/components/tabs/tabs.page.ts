import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isProf: boolean = false;

  constructor(
    public storage: Storage,
  ) {}

  async ngOnInit() {
    this.isProf = JSON.parse(await this.storage.get('isProf'));
    console.log("salut")
  }

}
