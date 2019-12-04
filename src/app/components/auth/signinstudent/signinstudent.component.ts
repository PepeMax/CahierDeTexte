import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ComponentsService } from 'src/app/services/components.service';
import { TranslateService } from '@ngx-translate/core';
import { HandleErrorService } from 'src/app/services/handle-error.service';


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
    private userService: UserService,
    private components: ComponentsService,
    public trans: TranslateService,
    private alertCtrl: AlertController,
    private handleError: HandleErrorService,
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.signInUser(email, password)
    .then(() => {
      if (this.userService.returnIsProf() == false) {
        this.userService.getUserName();
        this.navCtrl.navigateRoot('/nav/home')
        this.components.createLoading(this.trans.instant('COMMON.WAITING'))
        this.components.createToast(this.trans.instant('LOGIN.MSG_STUDENT'));
      } else {
        this.components.createAllert(this.trans.instant('COMMON.ERROR'), this.trans.instant('ERRORS.ERROR_IS_NOT_PROF') + this.trans.instant('LOGIN.ERROR_MESSAGE'));
        this.authService.signOutUser();
      }
    })
    .catch(async err => {
      const alert = await this.alertCtrl.create({
        header: this.trans.instant('COMMON.ERROR'),
        message: this.handleError.handleError(err) + this.trans.instant('LOGIN.ERROR_MESSAGE'),
        cssClass: 'error_login',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}