import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserinfosComponent } from './userinfos/userinfos.component';
import { SigninProfComponent } from './auth/signinprof/signinprof.component';
import { SigninStudentComponent } from './auth/signinstudent/signinstudent.component';


@NgModule({
    declarations: [
        SignupComponent,
        SigninProfComponent,
        SigninStudentComponent,
        UserinfosComponent,
    ],
        
    exports: [
        SignupComponent,
        SigninStudentComponent,
        UserinfosComponent,
    ],
    entryComponents: [
        SignupComponent,
        SigninProfComponent,
        SigninStudentComponent,
        UserinfosComponent,
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
