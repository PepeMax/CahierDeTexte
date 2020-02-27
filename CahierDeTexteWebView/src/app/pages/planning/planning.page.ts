import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {


  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController,
    private document: DocumentViewer,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private fileTransfer: FileTransfer,
    private storage: Storage
  ) { }

  public readonly docObject = { src: 'Planning.pdf', title: 'Planning de la semaine' };

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.downloadPDF();
    this.displayPDF(this.docObject);
    this.navCtrl.navigateRoot('/nav/home');
  }

  async downloadPDF() {
    let url;
    let previous_url = await this.storage.get('url');
    await firebase.firestore().collection('pdf').doc("1").get()
      .then(doc => {
        url = doc.data().url;
        this.storage.set('url', url);
      }).catch((error) => {
        console.error(error);
      });    
    if (url != previous_url) {
      this.fileTransfer.create().download(url, this.file.dataDirectory + 'Planning.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        console.error(error);
      });
    } else {
    }
  }

  displayPDF(documentation) {
    const filePath = this.file.dataDirectory;
    if (this.platform.is('android')) {
      this.file.copyFile(filePath, documentation.src, this.file.dataDirectory, documentation.title).then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      });
    } else {
      // Use Document viewer for iOS for a better UI
      const options: DocumentViewerOptions = {
        title: documentation.title,
        documentView: { closeLabel: "cancel" },
        navigationView: { closeLabel: "test" }
      };
      this.document.viewDocument(`${filePath}/${documentation.src}`, 'application/pdf', options);
    }
  }
}


