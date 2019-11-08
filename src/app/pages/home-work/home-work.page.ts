import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

  public homework;

  constructor(
    public trans: TranslateService,
    public firebase: FirebaseService
  ) { }

  ngOnInit() {
    this.getEventFireBase();
  }

  async getEventFireBase() {
    this.firebase.getFromFireBase()
      .subscribe((events) => {
        console.log(events);
        this.homework = events
      });
  }

  doRefresh(val) {
    setTimeout(() => {
      val.target.complete();
    }, 2000);
    this.getEventFireBase();
  }

}
