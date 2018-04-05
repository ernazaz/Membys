import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LoyaltyService {
  constructor(private db: AngularFireDatabase) {
 
  }

create(level,id){
 return this.db.object('companies_membership/company_id/levels/'+id).set(level);
}

getAll () {
 return this.db.list('companies_membership/company_id/levels/');
}
getLevel () {
 return this.db.list('companies_membership/company_id/levels/level');
}
getOffers (key) {
 return this.db.list('companies_membership/company_id/levels/' + key + '/offer');
}

offers(off,key){
 return this.db.list('companies_membership/company_id/levels/'+key+'/offer').push(off);
}
updates(off,key){
 return this.db.object('companies_membership/levels/' + key).update(off);
}
update_offer(off,parent,child){
 return this.db.object('companies_membership/company_id/levels/' + parent + '/offer/'+child).update(off);
}

saveBonus(bonus){
 return this.db.list('companies_membership/company_id/punch_prizes').push(bonus);
}
getBonus(){
 return this.db.list('companies_membership/company_id/punch_prizes/');
}
updateBonus(bonus,bonusKey){
 return this.db.object('companies_membership/company_id/punch_prizes/' + bonusKey).update(bonus);
}

}
