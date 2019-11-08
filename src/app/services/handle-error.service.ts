import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class HandleErrorService {

  public errorParse;

  constructor(
    public trans: TranslateService,

  ) { }

  handleError(error) {
    this.errorParse = JSON.stringify(error);
    this.errorParse = JSON.parse(this.errorParse)

    switch (this.errorParse.code) {
      case "auth/invalid-email": {
        return this.trans.instant('LOGIN.ERROR_MAIL_INVALID')
        break;
      }
      case "auth/user-not-found": {
        return this.trans.instant('LOGIN.ERROR_USER_NOT_FOUND')
        break;
      }
      case "auth/wrong-password": {
        return this.trans.instant('LOGIN.ERROR_PASSWORD_INVALID')
        break
      }
      default: {
        break;
      }
    }
  }
}