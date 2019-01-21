import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HowInsuranceWorksPage } from '../how-insurance-works/how-insurance-works';
import { LifeInsurancePage } from '../life-insurance/life-insurance';
import { WhyInvestInInsurancePage } from '../why-invest-in-insurance/why-invest-in-insurance';
import { Search } from '../../models/search';

@Component({
  selector: 'page-insurance',
  templateUrl: 'insurance.html'
})
export class InsurancePage implements OnInit {
  search: Search[];
  
  ngOnInit() {

    this.search = [
  
      new Search("How insurance works"),
  
      new Search("Why invest in insurance?"),

      new Search("Life Insurance")  
    ];
  
  }  

  constructor(public navCtrl: NavController) {
  }

 
  goToHowInsuranceWorks(params){
    if (!params) params = {};
    this.navCtrl.push(HowInsuranceWorksPage);
  }goToLifeInsurance(params){
    if (!params) params = {};
    this.navCtrl.push(LifeInsurancePage);
  }goToWhyInvestInInsurance(params){
    if (!params) params = {};
    this.navCtrl.push(WhyInvestInInsurancePage);
  }
  getItems(ev: any) {

    // Reset items back to all of the items

   this.ngOnInit();

 

    // set val to the value of the searchbar

    let val = ev.target.value;

    console.log("search"+val);

    if (val && val.trim() != '') {

      this.search = this.search.filter(item => item.name.toLowerCase().includes(val.toLowerCase()) 
      )

    }
  }
}
