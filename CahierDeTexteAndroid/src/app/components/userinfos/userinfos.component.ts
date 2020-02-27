import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrls: ['./userinfos.component.scss'],
})
export class UserinfosComponent implements OnInit {

  setUserInfosForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.initForms
  }

  initForms() {
    this.setUserInfosForm = this.formBuilder.group({
      status: ['', [Validators.required]],
      displayName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  async onSubmit() {
    const status = this.setUserInfosForm.get('status').value;
    const displayName = this.setUserInfosForm.get('displayName').value;

    const loading = await this.loadingCtrl.create({
      backdropDismiss: false,
      spinner: "crescent",
    });
    loading.present();
  }

}
