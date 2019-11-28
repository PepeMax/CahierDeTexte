import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { SlidesPage } from 'src/app/pages/slides/slides.page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private Slide: SlidesPage
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  async onSubmit() {

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      spinner: "crescent",
    });
    loading.present();
    this.authService.createNewUser(email, password)
      .then(() => {
        this.authService.signInUser(email, password)
          .then(() => {
            loading.dismiss();
            this.modalCtrl.dismiss();
          });
        },
        (error) => {
          this.errorMessage = error;
          loading.dismiss();
        });
  }
}
