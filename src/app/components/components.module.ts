import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
//auth
import { SigninProfComponent } from './auth/signinprof/signinprof.component';
import { SigninStudentComponent } from './auth/signinstudent/signinstudent.component';
import { CheckodeComponent } from './auth/checkode/checkode.component';
import { InfoslyceeComponent } from './popover/infoslycee/infoslycee.component';


@NgModule({
    declarations: [
        //auth
        SignupComponent,
        SigninProfComponent,
        SigninStudentComponent,
        CheckodeComponent,
        //
        InfoslyceeComponent

    ],

    exports: [
        //auth
        SignupComponent,
        SigninStudentComponent,
        CheckodeComponent,
        //
    ],
    entryComponents: [
        //auth
        SignupComponent,
        SigninProfComponent,
        SigninStudentComponent,
        CheckodeComponent,
        //
        InfoslyceeComponent,
    ],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        FormsModule,
        TranslateModule.forChild()
    ],
})

export class ComponentsModule { }
