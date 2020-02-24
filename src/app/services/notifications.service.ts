import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public localNotifications: LocalNotifications,
    private trans: TranslateService
    ) { }

  notif_NewHomeWork() {
    this.localNotifications.schedule({
      id: 1,
      text: this.trans.instant('NOTIFICATION.NEW_HOMEWORK'),
      // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      // data: { secret: key }
      // icon: 'https://www.mondialrelay.fr/images/Responsive/logo@1x.png'
  });
  }

  notif_NewPlanning() {
    this.localNotifications.schedule({
      id: 1,
      text: this.trans.instant('NOTIFICATION.NEW_PLANNING'),
      // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      // data: { secret: key }
      // icon: 'https://www.mondialrelay.fr/images/Responsive/logo@1x.png'
  });
  }
  
}
