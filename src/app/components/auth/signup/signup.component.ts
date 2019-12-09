import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { SlidesPage } from 'src/app/pages/slides/slides.page';
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
    private Slide: SlidesPage,
    private alertController: AlertController,
    public trans: TranslateService,
  ) { }

  ngOnInit() {
    this.initForms();
  }

  userStatuts(value) {

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
      //faire une modal plutot
      const alert = await this.modalCtrl.create({
        component: CheckodeComponent,
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
      alert.present();
    
      return await alert.present();
      // const alert = await this.alertController.create({
      //   header: "il vous reste" + this.nbChance + "chances",//this.trans.instant('SETTINGS.CHANGE_ND'),
      //   //subHeader: this.traname,ns.instant('SETTINGS.CHANGE_ND_SUB_HEADER') + this.user
      //   inputs: [
      //     {
      //       name: 'code',
      //       type: 'text',
      //       placeholder: "Code mystère"
      //     }
      //   ],
      //   buttons: [
      //     {
      //       text: this.trans.instant('COMMON.CANCEL'),
      //       role: 'cancel',
      //       cssClass: 'secondary',
      //       handler: () => {
      //       }
      //     }, {
      //       text: this.trans.instant('COMMON.OK'),
      //       handler: (alertData) => {
      //         this.code = alertData.code;
              
      //           if (this.code == 3322) {
      //             this.codeChecked = true;
      //           } else {
      //             this.nbChance--;
      //             console.log(this.nbChance)
      //           }
              

      //       //on affiche la liste des 
      //         //loading.present();
      //       }
      //     }

      //   ]
      // });
      // await alert.present();

    } else if (status === "stud") {
    this.authService.createNewUser(email, password)
      .then(() => {
        console.log("bien crée")
        loading.dismiss();
        this.modalCtrl.dismiss();
      });
    }
    (error) => {
      console.log("érreur")
      this.errorMessage = error;
      loading.dismiss();
    };
  }
}
