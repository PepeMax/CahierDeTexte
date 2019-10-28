import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {

  public readonly docObject = {src : 'Planning.pdf', title: 'Planning de la semaine'};

  constructor(
    public navCtrl: NavController,
    public trans: TranslateService,
    public toastController: ToastController,
    private document: DocumentViewer,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
  }

  onClickOpenPdfItem(documentation) {
    const filePath = this.file.applicationDirectory + 'www/assets';

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


