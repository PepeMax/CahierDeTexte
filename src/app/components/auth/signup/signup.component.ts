import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { CheckodeComponent } from 'src/app/components/auth/checkode/checkode.component';
import { Storage } from '@ionic/storage';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public errorMessage: string;
  public isNotStudent: boolean = true;
  public statusInput;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private handleErr: HandleErrorService,
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
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      status: ['', [Validators.required]],
      name: ['', [Validators.nullValidator]],
    });
  }

  setNameForStudent() {
    if (this.statusInput === "false") {
      this.isNotStudent = false;
      this.signupForm.get('name').setValidators([Validators.required, Validators.pattern(/[0-9a-zA-Z]{3,}/)]);
    } else if (this.statusInput === "true") {
      this.signupForm.get('name').setValidators(null);
      this.isNotStudent = true;
    }
  }

  async onSubmit() {
    const db = firebase.firestore();

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const status = this.isNotStudent;
    const name = this.signupForm.get('name').value;

    this.storage.set('email', email);
    this.storage.set('password', password);
    this.storage.set('status', status);

    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      spinner: "crescent",
    });

    if (status == true) {
      const modalCheckCode = await this.modalCtrl.create({
        component: CheckodeComponent,
        id: "modalCheckCode",
        componentProps: {
          message: {
            button: {
              validate: 'COMMON.OK'
            },
            content: 'CONTRIBUTION_PAGE.POP_UP_RETURN_PAYMENT'
          }
        },
        cssClass: 'alert-modal',
      });
      modalCheckCode.present();
    } else if (status == false) {
      loading.present();
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
          return db.collection('users').doc(cred.user.uid).set({
            email: email,
            name: name,
            status: status
          }).then(() => {
            this.authService.signInUser(email, password)
              .then(() => {
                this.navCtrl.navigateRoot("nav/home");
                loading.dismiss();
              }).catch((error) => {
                this.errorMessage = this.handleErr.handleError(error);
                loading.dismiss();
              });
          });
        }).catch((error) => {
          this.errorMessage = this.handleErr.handleError(error);
          loading.dismiss();
        });
    }
  }

}
