import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class HandleErrorService {

  public errorParse;

  constructor(
    public trans: TranslateService,
    public navCtrl: NavController
  ) { }

  handleError(error) {
    this.errorParse = JSON.stringify(error);
    this.errorParse = JSON.parse(this.errorParse)

    switch (this.errorParse.code) {
      //signInWithEmailAndPassword
      case "auth/invalid-email": {
        return this.trans.instant('ERRORS.ERROR_MAIL_INVALID')
        break;
      }
      case "auth/user-disabled": {
        this.navCtrl.navigateRoot('/login')
        return this.trans.instant('ERRORS.ERROR_USER_DISABLED')

        break
      }
      case "auth/user-not-found": {
        return this.trans.instant('ERRORS.ERROR_USER_NOT_FOUND')
        break;
      }
      case "auth/wrong-password": {
        return this.trans.instant('ERRORS.ERROR_PASSWORD_INVALID')
        break
      }
      //updateCurrentUser
      case "auth/invalid-user-token": {
        return this.trans.instant('ERRORS.ERROR_PASSWORD_INVALID')
        break
      }
      case "auth/user-token-expired": {
        return this.trans.instant('ERRORS.ERROR_USER_TOKEN_EXPIRED')
        break
      }
      case "auth/null-user": {
        return this.trans.instant('ERRORS.ERROR_NULL_USER')
        break
      }
      case "auth/tenant-id-mismatch": {
        return this.trans.instant('ERRORS.ERROR_TENANT_ID_MISMATCH')
        break
      }
      
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }
      // case "auth/null-user": {
      //   return this.trans.instant('ERROR.ERROR_PASSWORD_INVALID')
      //   break
      // }

      default: {
          return this.trans.instant('ERRORS.ERROR_UNKOWN')
        break;
      }
    }
  }
}