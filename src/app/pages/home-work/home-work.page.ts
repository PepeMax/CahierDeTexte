import { Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

  public homeworks;

  constructor(
    public trans: TranslateService,
    public firebase: FirebaseService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getEventFireBase();
  }

  async getEventFireBase() {
    this.firebase.getFromFireBase()
      .subscribe((events) => {
        console.log(events);
        this.homeworks = events
      });
  }

  doRefresh(val) {
    setTimeout(() => {
      val.target.complete();
    }, 2000);
    this.getEventFireBase();
  }


  public buttonClickedgmod: boolean = false;
  public onButtonClickgmod() {
    this.buttonClickedgmod = !this.buttonClickedgmod;
  }

}
