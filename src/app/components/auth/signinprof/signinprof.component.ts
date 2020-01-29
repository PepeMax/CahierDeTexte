import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { ComponentsService } from 'src/app/services/components.service';
import { TranslateService } from '@ngx-translate/core';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signinprof',
  templateUrl: './signinprof.component.html',
  styleUrls: ['./signinprof.component.scss'],
})
export class SigninProfComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private components: ComponentsService,
    public trans: TranslateService,
    private alertCtrl: AlertController,
    private handleError: HandleErrorService,
    private modalCtrl: ModalController,
    private storage: Storage,
  ) { }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  async onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(doc => {
            let status = doc.data().status;
            this.storage.set('status', status);
            if (status == true) {
              this.navCtrl.navigateRoot('/nav/home');
              this.modalCtrl.dismiss();
              this.components.createLoading(this.trans.instant('COMMON.WAITING'));
              this.components.createToast(this.trans.instant('LOGIN.MSG_PROF'));
            } else {
              this.components.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
              this.authService.signOutUser();
            }
          });
      }
    });
    this.authService.signInUser(email, password)
      .catch(async err => {
        const alert = await this.alertCtrl.create({
          header: this.trans.instant('COMMON.ERROR'),
          message: this.handleError.handleError(err) + this.trans.instant('LOGIN.ERROR_MESSAGE'),
          cssClass: 'error_login',
          buttons: ['OK']
        });
        this.modalCtrl.dismiss();
        await alert.present();
      });
  }
}