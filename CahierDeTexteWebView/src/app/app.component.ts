import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { enableDarkTheme } from './components/helpers/utils';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

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
    private threeDeeTouch: ThreeDeeTouch,
    private callNumber: CallNumber,

  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.language = await this.storage.get('language');
    if (this.language == null) {
      this.language = 'fr';
    }
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
        type: 'search',
        title: 'Site Mr Giorgi',
        iconType: 'Share'
      },
      {
        type: 'contact',
        title: 'CFA',
        iconType: 'Contact'
      },

    ];

    this.threeDeeTouch.configureQuickActions(actions);

    this.threeDeeTouch.onHomeIconPressed()
      .subscribe((payload) => {
        // returns an object that is the button you presed
        if (payload.type == 'contact') {
          this.callNumber.callNumber("0556917342", true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        } else if (payload.type == 'share') {
          window.open("http://pgiorgi.name/gpc", '_system', 'location=yes')
        } else {
          // hook up any other icons you may have and do something awesome (e.g. launch the Camera UI, then share the image to Twitter)
          console.log(JSON.stringify(payload));
        }
      });
  }

  changeLanguage(language) {
    this.translate.use(language);
    this.storage.set('language', language);
  }

}
