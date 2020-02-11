import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { enableDarkTheme } from './components/helpers/utils';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  private darkMode: boolean;
  private language: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private storage: Storage,
    private threeDeeTouch: ThreeDeeTouch

  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.language = await this.storage.get('language');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang(this.language);
    });
    this.darkMode = await this.storage.get('valueDarkMode');
    enableDarkTheme(this.darkMode);
    
    this.threeDeeTouch.isAvailable().then(isAvailable => console.log('3D Touch available? ' + isAvailable));
    this.threeDeeTouch.watchForceTouches()
      .subscribe((data: ThreeDeeTouchForceTouch) => {
        console.log('Force touch %' + data.force);
        console.log('Force touch timestamp: ' + data.timestamp);
        console.log('Force touch x: ' + data.x);
        console.log('Force touch y: ' + data.y);
      });

    let actions: ThreeDeeTouchQuickAction[] = [
      {
        type: 'checkin',
        title: 'Check in',
        subtitle: 'Quickly check in',
        iconType: 'Compose'
      },
      {
        type: 'share',
        title: 'Share',
        subtitle: 'Share like you care',
        iconType: 'Share'
      },
      {
        type: 'search',
        title: 'Search',
        iconType: 'Search'
      },
      {
        title: 'Show favorites',
        iconTemplate: 'HeartTemplate'
      }
    ];

    this.threeDeeTouch.configureQuickActions(actions);

    this.threeDeeTouch.onHomeIconPressed()
      .subscribe((payload) => {
        // returns an object that is the button you presed
        console.log('Pressed the ${payload.title} button')
        console.log(payload.type)
      });
  }

  changeLanguage(language) {
    this.translate.use(language);
    this.storage.set('language', language);
  }

}
