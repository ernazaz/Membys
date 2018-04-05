import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms'; 
import { DiscountsService } from './discounts.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  pins$;
  discounts$;
  constructor(private discountService: DiscountsService,private auth: AuthService) {
    //------ Get All pins
    this.auth.user$.subscribe(user => {
      this.pins$ = this.discountService.getPlaces();
    })
    //------------------
   }
   key;
   keys;
   forms;
   disc = {};
   edit: boolean;
   button:boolean;
   show(){
    this.edit = false;
     this.forms = !this.forms;
     this.disc = {};
   }
   // ----- Pin Information
   pinInfo(pin){
    this.forms = false;
    this.edit = false;
    this.button = true;
    this.key=pin.$key;
    console.log(this.key);
    this.discounts$ = this.discountService.getDiscount(this.key);
   }
   save(disc){
     console.log(disc);
     this.auth.user$.subscribe(user => {
      this.discountService.save(disc,this.key, user.uid);
    })
   }
   // Get Information about discount----
   getDiscount(discout){
     this.disc = discout;
     this.keys= discout.$key;
     this.forms = false;
     this.edit = true;
    }
//----- Update Pin --------
    update(discount){
      console.log(discount);
      this.discountService.update(discount,this.key,this.keys);
    }

  ngOnInit() {
  }

}
