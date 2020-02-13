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

  studIcon: string = 'arrow-dropdown';
  profIcon: string = 'arrow-dropdown';

  public display_stud: boolean = false;
  public display_prof: boolean = false;

  public nbStud : number;
  public nbProf : number;
  

  public tab_Stud = [
    { name: "Antoine ALEXANDRE", email: "antoine.alexandre59@gmail.com" },
    { name: "Tancrède CASTETS", email: "tancrede.castets@gmail.com" },
    { name: "Denis CHALARD", email: "chalard.d@hotmail.fr" },
    { name: "Noël COMBARIEU", email: "noel.combarieu33138@gmail.com" },
    { name: "Martial DAMIENS", email: "martial.damiens@gmail.com" },
    { name: "Maxime DENOST", email: "maxime.denost@laposte.net" },
    { name: "Victor DERUELLE", email: "victor.deruelle@laposte.net" },
    { name: "Mathieu DUMORA BRUNG", email: "brung.mathieu@gmail.com" },
    { name: "Hugo FERREIRA", email: "hugoferreira107@hotmail.com" },
    { name: "Benjamin GATIUS", email: "benjamin.gatius@gmail.com" },
    { name: "Nicolas GOBERT", email: "nicolas.gobert@vivaldi.net" },
    { name: "Romuald JARENO", email: "romu.j@hotmail.fr" },
    { name: "Luc JAYMOT", email: "ljaymot@gmail.com" },
    { name: "Arthur JEZEQUEL", email: "jezequelarthur@gmail.com" },
    { name: "Steven JUMEL", email: "jumelsteven40@gmail.com" },
    { name: "Jean MAZAGOT", email: "contact@jeanmazagot.fr" },
    { name: "Prune MITOYEN", email: "Mitoyen.prune@orange.fr" },
    { name: "Axel MOREAU", email: "axel.moreau2000@gmail.com" },
    { name: "Marie-Claire MUSSET", email: "marie.claire.musset@gmail.com" },
    { name: "Valentin NOURRY", email: "valentin.nourry.sn@gmail.com" },
    { name: "Valentin ONOLFO", email: "val.onolfo@gmail.com" },
    { name: "Alexandre RODRIGUEZ", email: "alexandrerodriguez32@gmail.com" },
    { name: "Malek SALHI", email: "malekprosen@gmail.com" },
    { name: "Lucas TAIEB", email: "taieblucas18@gmail.com" }
  ]
  
  public tab_Prof = [
    { name: " Virginie ARNAULD ", email: " v.ads@free.fr" },
    { name: " Frédérique BALUTEAU ", email: " frederique.baluteau@greta-cfa-aquitaine.fr" },
    { name: " Hélèna Berger ", email: " helena.berger33@gmail.com" },
    { name: " FORGES Cathy ", email: " forges.cathy@gmail.com" },
    { name: " Edwige CLERMONT ", email: " edwigeclermont@free.fr" },
    { name: " Fernand GARRIDO ", email: " fernand.garrido@ac-bordeaux.fr" },
    { name: " Pascal GIORGI ", email: " p.giorgi@orange.fr" },
    { name: " Régis LAMOUROUX ", email: " regis.lamouroux@gmail.com" },
    { name: " Azeddine MAJNANI ", email: " azeddinemajnani@gmail.com" },
    { name: " Bertrand MEULEBROUCK ", email: " bmeulebrouck@yahoo.fr" },
    { name: " Nebout Nelly ", email: " nelly.nebout@orange.fr" },
    { name: " Bertrand RABUSSIER ", email: " bertrand@rabussier.name" },
    { name: " Didier Raymond ", email: " didierraymond@free.fr" },
    { name: " Estelle SORNETTE CYBULA ", email: " sornette@netcourrier.com" }
  ]

  ngOnInit() {
    this.nbStud = this.tab_Stud.length;
    this.nbProf = this.tab_Prof.length;
  }

  display_student() {
    if (this.display_stud == false) {
      this.display_stud = true;
      this.studIcon = this.studIcon === 'arrow-dropdown' ? 'arrow-dropup' : 'arrow-dropdown';
    } else if (this.display_stud == true) {
      this.display_stud = false;
      this.studIcon = this.studIcon === 'arrow-dropdown' ? 'arrow-dropup' : 'arrow-dropdown';
    }
  }

  display_professor() {
    if (this.display_prof == false) {
      this.display_prof = true;
      this.profIcon = this.profIcon === 'arrow-dropdown' ? 'arrow-dropup' : 'arrow-dropdown';
    } else if (this.display_prof == true) {
      this.display_prof = false;
      this.profIcon = this.profIcon === 'arrow-dropdown' ? 'arrow-dropup' : 'arrow-dropdown';
    }
  }

  goBack() {
    this.navCtrl.navigateBack("/nav/home");
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
