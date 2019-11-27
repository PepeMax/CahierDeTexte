import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private httpClient: HttpClient,
    public toastController: ToastController,
    public trans: TranslateService,

  ) { }

  addOnFireBase(val) {
    this.httpClient
      .put('https://cahier-de-texte-pepemax.firebaseio.com/cahier_de_texte.json', val)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: this.trans.instant('COMMON.FIREBASE_ADD_HOME-WORK_FAIL'),
            duration: 2000,
            cssClass: 'toast',
          });
          toast.present();

          console.log('Erreur ! : ' + error);
        }
      );
  }

  getFromFireBase(): Observable<any> {
    return this.httpClient
      .get<any[]>('https://cahier-de-texte-pepemax.firebaseio.com/cahier_de_texte.json')
  }
}
