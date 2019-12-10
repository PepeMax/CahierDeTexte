import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CheckodeComponent } from 'src/app/components/auth/checkode/checkode.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  private code: number;
  private codeChecked: boolean = false;
  private nbChance: number = 3;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    public trans: TranslateService,
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      status: ['', [Validators.required]],
    });
  }

  async onSubmit() {

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const status = this.signupForm.get('status').value;

    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      spinner: "crescent",
    });

    if (status === "prof") {
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
      return await modalCheckCode.present();
    } else if (status === "student") {
      loading.present();
      this.authService.createNewUser(email, password)
        .then(() => {
          console.log("bien crée")
          this.authService.signInUser(email, password)
          .then(() => {
            this.navCtrl.navigateRoot("nav/home")
            loading.dismiss();
          })
        });
      (error) => {
        console.log("érreur")
        this.errorMessage = error;
        loading.dismiss();
      };
    }

  }
}
