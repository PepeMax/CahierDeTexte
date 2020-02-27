import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';

//FireBase
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase';

import { HandleErrorService } from './services/handle-error.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { SlidesPage } from './pages/slides/slides.page';
import { HomeWorkPage } from './pages/home-work/home-work.page';

import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PlanningPage } from './pages/planning/planning.page';

import { FCM } from '@ionic-native/fcm/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DocumentViewer,
    File,
    FileOpener,
    FileTransfer,
    AuthService,
    HandleErrorService,
    SlidesPage,
    CallNumber,
    HomeWorkPage,
    ThreeDeeTouch,
    EmailComposer,
    PlanningPage,
    FCM,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
