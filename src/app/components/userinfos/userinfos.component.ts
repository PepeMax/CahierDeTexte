import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrls: ['./userinfos.component.scss'],
})
export class UserinfosComponent implements OnInit {

  setUserInfosForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
}
