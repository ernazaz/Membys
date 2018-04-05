import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Location } from '@angular/common';
import { LoyaltyService } from './loyalty.service';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.css']
})
export class LoyaltyComponent implements OnInit {

  levels$;
  offers$;
  levelis;
  bonus$;
  constructor(private loyaltyService: LoyaltyService,){
    this.levels$ = this.loyaltyService.getAll();
    this.levelis = this.loyaltyService.getLevel();
    this.bonus$ = this.loyaltyService.getBonus();
  }
  gg = this.levels$;
  level = this.gg;
   offers = [
    { id: 1, name: 'Procentine nuolaida'},
    { id: 2, name: 'Skaitine nuolaida'},
    { id: 3, name: 'Renginys'},
    { id: 4, name: 'Speciali nuolaida'},
    { id: 5, name: 'Kita'},
   ];

  //------------------
  
  
  //------------------
   display:boolean;
   turn: boolean;
   saves: boolean;
   form: boolean;
   bonuses: boolean;

//----------- Leveliai --------------

information = {};
show(){
  this.editbon = false;
  this.prize = false;
  this.bonuses = false;
 this.turn = !this.turn;
 this.information = {};
 this.display= false;
 
}
number = 0;
parent_key;
getLevel(info){
  this.editbon = false;
  this.prize = false;
  this.bonuses = false;

 this.information = info;
 this.turn= false;
 this.display= true;
 this.parent_key= info.$key;
 console.log(this.parent_key);
 this.offers$ = this.loyaltyService.getOffers(this.parent_key);
 
}
save(level){
  this.editbon = false;
  this.prize = false;
  this.bonuses = false;

  this.saves = true;
  this.loyaltyService.create(level,level.level);
  
}
update(level){
  this.editbon = false;
  this.prize = false;
  this.bonuses = false;
  this.prize = false;
  this.loyaltyService.updates(level,this.parent_key);
  console.log("done");

}

getInfo(of){
  this.editbon = false;
  this.prize = false;
  this.bonuses = false;
  console.log(of);
  this.child = of.$key;
  this.all_offers = of;
  this.edit = true;
  this.form=false;
}
update_offer(off){
 this.loyaltyService.update_offer(off,this.parent_key,this.child);

 console.log(this.child);

}

all_offers = {};
child;
offs(off){

 if( (off.age_from == '' ) || (off.age_to)){
   off.age_from = 1;
   off.age_to = 99;
 }
 console.log(off);
   this.loyaltyService.offers(off,this.parent_key);
}
edit:boolean;

forms(){
  this.editbon = false;
  this.prize = false;
 this.form = !this.form;
 this.all_offers = {};
 this.edit = false;
}


//-----------------------------------

//-------Bonusai------------------

bon = {};
bonus_key;

openBonus(){
  this.display= false;
  this.turn = false;
  this.saves=false;
  this.bonuses = !this.bonuses;
}

addPrize(){
  this.display= false;
  this.turn = false;
  this.saves=false;
  this.editbon = false;
  this.prize = !this.prize;
  this.bon = {};
 }
 
saveBonus(bonus){
  this.loyaltyService.saveBonus(bonus);
}

getBonuses(bons){
 this.display= false;
 this.turn = false;
 this.saves=false;

 this.bonus_key= bons.$key;

  this.bon = bons;
 console.log(this.bonus_key);
 this.prize = false;
 this.editbon = true;

}
editbon:boolean;
prize:boolean;


updateBonus(bon){
 console.log(bon)
 this.loyaltyService.updateBonus(bon,this.bonus_key);
}


//-------------------------------


  
 


 

  ngOnInit() {
  }

}
