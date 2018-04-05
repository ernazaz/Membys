import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import { Upload } from './upload';

@Injectable()
export class PlacesService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }
  private basePath:string = '/logos';
  uploads: FirebaseObjectObservable<Upload[]>;

  save(form,upload: Upload,uid){
    let storageRef = firebase.storage().ref();
    let uploadTask;
    uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          let snap = snapshot as firebase.storage.UploadTaskSnapshot
        },
        (error) => {
          console.log(error)
        },
        () => {
          // upload success
          upload.url = uploadTask.snapshot.downloadURL
          upload.name = upload.file.name
          this.saveFileData(form,upload,uid)
        }
      );
  }
  getPlace(){
    return this.db.list('/companies/');
  }

  private saveFileData(form,upload: Upload,uid){
    form.map(data => {
      this.db.list('companies/').push({
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        category: data.category,
        logo: upload.url,
        description: data.description,
        monday: data.monday,
        tuesday: data.tuesday,
        wednesday: data.wednesday,
        thursday:data.wednesday,
        friday:data.friday,
        saturday:data.saturday,
        sunday:data.sunday,
        companyId: uid,
      });
    }) 

  }

}
