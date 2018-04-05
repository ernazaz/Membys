import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscountsService {

  constructor(private db: AngularFireDatabase,
  private auth: AuthService) { }

  getPlaces(){
    return this.db.list('/companies/');
  }
  save (discount,key,uid){
    return this.db.list('/discounts/'+key).push(discount);
  }
  getDiscount(parent){
   return this.db.list('/discounts/'+parent);
  }
  update(discount,key, keys){
    return this.db.object('/discounts/'+ key+"/"+keys).update(discount);
  }


}
