import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HomeWorkService {
  
  constructor() { }
  
  public homeworks;
  
  addHomeWork(fordate: String, infos: String, name: String, type: String) {
    const dbcollection = firebase.firestore().collection('homeworks');
    dbcollection.add({
      fordate: fordate,
      infos: infos,
      name: name,
      type: type,
    }).then(() =>{

    }).catch((error) => {

    });
  }

  getHomeWork() {
    const dbcollection = firebase.firestore().collection('homeworks');
    this.homeworks = dbcollection.get();
    console.log(dbcollection)
    // return this.homeworks
  }
}
