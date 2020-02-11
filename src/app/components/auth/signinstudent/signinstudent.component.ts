import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { ComponentsService } from 'src/app/services/components.service';
import { TranslateService } from '@ngx-translate/core';
import { HandleErrorService } from 'src/app/services/handle-error.service';

import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signinstudent',
  templateUrl: './signinstudent.component.html',
  styleUrls: ['./signinstudent.component.scss'],
})
export class SigninStudentComponent implements OnInit {

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

  public identifier: {
    mail: string,
    password: string,
    saveIdentifier: boolean
  } = { mail: '', password: '', saveIdentifier: false };

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  connectIcon: string = 'radio-button-off';

  test() {
    this.connectIcon = this.connectIcon === 'radio-button-off' ? 'radio-button-on' : 'radio-button-off';
  }

  stayConnected() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.connectIcon = this.connectIcon === 'radio-button-off' ? 'radio-button-on' : 'radio-button-off';
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async ngOnInit() {
    this.initForms();
    let setIdentifier = await this.getIdentifier();
    if (setIdentifier.mail != "" && setIdentifier.password != "") {
      this.signinForm.controls['email'].setValue(setIdentifier.mail);
      this.signinForm.controls['password'].setValue(setIdentifier.password);
      this.signinForm.controls['saveIdentifier'].setValue(setIdentifier.saveIdentifier);
    }
  }
  async getIdentifier() {
    let getIdentifier: { mail: string, password: string, saveIdentifier: boolean } = { mail: '', password: '', saveIdentifier: false };
    try {
      const str = await this.storage.get('identifier_professor');
      getIdentifier = str;
      return getIdentifier;
    } catch (error) {
      console.error(error)
    }
  }

  initForms() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      saveIdentifier: [''],
    });
    this.signinForm.controls['saveIdentifier'].setValue(false);
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
            if (status == false) {
              this.navCtrl.navigateRoot('/nav/home');
              this.modalCtrl.dismiss();
              this.components.createLoading(this.trans.instant('COMMON.WAITING'));
              this.components.createToast(this.trans.instant('LOGIN.MSG_STUDENT'));
            } else {
              this.components.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_NOT_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
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
    if (this.signinForm.get('saveIdentifier').value == true) {
      this.identifier.mail = email;
      this.identifier.password = password;
      this.identifier.saveIdentifier = this.signinForm.get('saveIdentifier').value;
    }
    this.storage.set('identifier_professor', this.identifier);
  }
}