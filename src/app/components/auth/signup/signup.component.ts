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
  public isStudent: boolean = false;
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
    if (this.statusInput === "student") {
      this.isStudent = true;
      this.signupForm.get('name').setValidators([Validators.required, Validators.pattern(/[0-9a-zA-Z]{3,}/)]);
    } else if (this.statusInput === "professor") {
      this.signupForm.get('name').setValidators(null);
      this.isStudent = false;
    }
  }

  async onSubmit() {
    const db = firebase.firestore();

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const status = this.signupForm.get('status').value;
    const name = this.signupForm.get('name').value;

    this.storage.set('email', email);
    this.storage.set('password', password);

    this.storage.set('email', email);
    this.storage.set('password', password);

    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      spinner: "crescent",
    });

    if (status === "professor") {
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
    } else if (status === "student") {
      loading.present();
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
          return db.collection('users').doc(cred.user.uid).set({
            email: email,
            password: password,
            name: name
          }).then(() => {
            this.authService.signInUser(email, password)
              .then(() => {
                this.navCtrl.navigateRoot("nav/home");
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
