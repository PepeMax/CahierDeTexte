import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-email-user',
  templateUrl: './email-user.page.html',
  styleUrls: ['./email-user.page.scss'],
})
export class EmailUserPage implements OnInit {

  constructor(
    public navCtrl: NavController,
  ) { }

  student: String = "../../../assets/img/student.png";
  professor: String = "../../../assets/img/professor.png";

  public display_stud: boolean = false;
  public display_prof: boolean = false;

  ngOnInit() {
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
}
