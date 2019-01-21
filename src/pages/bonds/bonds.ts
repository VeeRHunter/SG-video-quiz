import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HowBondInvestingWorksPage } from '../how-bond-investing-works/how-bond-investing-works';
import { Search } from '../../models/search';

@Component({
  selector: 'page-bonds',
  templateUrl: 'bonds.html'
})
export class BondsPage implements OnInit {
  search: Search[];

  ngOnInit() {
    this.search = [

      new Search("Investing Basics"),

      new Search("Investing 101"),

      new Search("How Bond Investing Works")
    ];
  }

  constructor(public navCtrl: NavController) {
  }
  goToHowBondInvestingWorks(params) {
    if (!params) params = {};
    this.navCtrl.push(HowBondInvestingWorksPage, params);
  }
  getItems(ev: any) {

    // Reset items back to all of the items

    this.ngOnInit();

    // set val to the value of the searchbar

    let val = ev.target.value;

    console.log("search" + val);

    if (val && val.trim() != '') {

      this.search = this.search.filter(item => item.name.toLowerCase().includes(val.toLowerCase())
      )

    }
  }
}