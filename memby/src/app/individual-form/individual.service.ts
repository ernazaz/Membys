import { Injectable, ErrorHandler } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { RouterStateSnapshot } from '@angular/router';


@Injectable()
export class IndividualService {
//-------------------------------------------------------
  private basePath = '/uploads/images';

  private getUrl;
  constructor(private db: AngularFireDatabase) { }
  storageRef = firebase.storage().ref();
  saveImage = [];
  private form;

//----------------------------------------------------
//------- Konversija
getUsers(){
  return this.db.list('/users_info/');
}
saveUsers(allUsers){
  return this.db.list('individual_offers_users/').push(allUsers);
}

Conversion (offer, image,name){
  let basePath = ('/uploads/' + name);
  let uploadTask;
  //--------- Upload Image
  uploadTask = this.storageRef.child(basePath).putString(image, 'base64', { contentType: 'image/png' });
  // -------------- Here checking all uploading
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      // upload in progress
      let snap = snapshot as firebase.storage.UploadTaskSnapshot
    },
    (error) => {
      // upload failed
      console.log(error)
    },
    () => {
      // upload success
      this.getUrl = uploadTask.snapshot.downloadURL;
     this.uploadConversion(offer, this.getUrl, );
    }
  );
}
private uploadConversion(bonus, url) {
  let saveForm = [];
  bonus.map(users => {
    this.db.list('/individual_offers/offers').push({
      category: users.category,
      gender: users.gender,
      age_from: users.age_from,
      age_To: users.age_To,
      center_longitude: users.center_longitude,
      center_latitude: users.center_latitude,
      radius: users.radius,
      photo: url,
    });
})
}

}






