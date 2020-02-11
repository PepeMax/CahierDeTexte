import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-email-user',
  templateUrl: './email-user.page.html',
  styleUrls: ['./email-user.page.scss'],
})
export class EmailUserPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private emailComposer: EmailComposer
  ) { }

  avatar_Student: String = "../../../assets/img/student.png";
  avatar_Professor: String = "../../../assets/img/professor.png";

  public display_stud: boolean = false;
  public display_prof: boolean = false;

  public nbStud : number;
  public nbProf : number;

  public tab_Stud = [
    { name: "Marie-Claire MUSSET", email: "marie.claire.musset@gmail.com" },
    { name: "Steven JUMEL", email: "jumelsteven40@gmail.com" },
    { name: "Malek SALHI", email: "malekprosen@gmail.com" },
    { name: "Tancrède CASTETS", email: "tancrede.castets@gmail.com" },
    { name: "Denis CHALARD", email: "chalard.d@hotmail.fr" },
    { name: "Maxime DENOST", email: "maxime.denost@laposte.net" },
    { name: "Jean MAZAGOT", email: "contact@jeanmazagot.fr" },
    { name: "Prune MITOYEN", email: "Mitoyen.prune@orange.fr" },
    { name: "Lucas TAIEB", email: "taieblucas18@gmail.com" },
    { name: "Nicolas GOBERT", email: "nicolas.gobert@vivaldi.net" },
    { name: "DAMIENS Martial", email: "martial.damiens@gmail.com" },
    { name: "Noël COMBARIEU", email: "noel.combarieu33138@gmail.com" },
    { name: "Mathieu DUMORA BRUNG", email: "brung.mathieu@gmail.com" },
    { name: "Luc JAYMOT", email: "ljaymot@gmail.com" },
    { name: "Arthur JEZEQUEL", email: "jezequelarthur@gmail.com" },
    { name: "Axel MOREAU", email: "axel.moreau2000@gmail.com" },
    { name: "Valentin NOURRY", email: "valentin.nourry.sn@gmail.com" },
    { name: "Valentin ONOLFO", email: "val.onolfo@gmail.com" },
    { name: "Alexandre RODRIGUEZ", email: "alexandrerodriguez32@gmail.com" },
    { name: "Benjamin GATIUS", email: "benjamin.gatius@gmail.com" },
    { name: "Victor DERUELLE", email: "victor.deruelle@laposte.net" },
    { name: "Hugo FERREIRA", email: "hugoferreira107@hotmail.com" },
    { name: "Antoine ALEXANDRE", email: "antoine.alexandre59@gmail.com" },
    { name: "Romuald JARENO", email: "romu.j@hotmail.fr" }
  ]
  
  public tab_Prof = [
    { name: " Edwige CLERMONT ", email: " edwigeclermont@free.fr" },
    { name: " Bertrand RABUSSIER ", email: " bertrand@rabussier.name" },
    { name: " Bertrand MEULEBROUCK ", email: " bmeulebrouck@yahoo.fr" },
    { name: " Azeddine MAJNANI ", email: " azeddinemajnani@gmail.com" },
    { name: " Nebout Nelly ", email: " nelly.nebout@orange.fr" },
    { name: " Didier Raymond ", email: " didierraymond@free.fr" },
    { name: " FORGES Cathy ", email: " forges.cathy@gmail.com" },
    { name: " Virginie ARNAULD ", email: " v.ads@free.fr" },
    { name: " Estelle SORNETTE CYBULA ", email: " sornette@netcourrier.com" },
    { name: " Hélèna Berger ", email: " helena.berger33@gmail.com" },
    { name: " Fernand GARRIDO ", email: " fernand.garrido@ac-bordeaux.fr" },
    { name: " Frédérique BALUTEAU ", email: " frederique.baluteau@greta-cfa-aquitaine.fr" },
    { name: " Régis LAMOUROUX ", email: " regis.lamouroux@gmail.com" }
  ]

  ngOnInit() {
    this.nbStud = this.tab_Stud.length;
    this.nbProf = this.tab_Prof.length;
  }

  display_student() {
    if (this.display_stud == false) {
      this.display_stud = true;
    } else if (this.display_stud == true) {
      this.display_stud = false;
    }
  }

  display_professor() {
    if (this.display_prof == false) {
      this.display_prof = true;
    } else if (this.display_prof == true) {
      this.display_prof = false;
    }
  }

  goBack() {
    this.navCtrl.navigateBack("/settings");
  }

  sendEmail(i) {
     let email = {
       to: this.tab_Stud[i].email,
       subject: '',
       body: 'Envoyé de l\' application "Cahier de texte"',
       isHtml: false
     }
     
     this.emailComposer.open(email);
  }
}
