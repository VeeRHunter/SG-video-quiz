import { NavController } from 'ionic-angular';
import { InvestingForBeginnersPage } from '../investing-for-beginners/investing-for-beginners';
import { WhatAreStocksPage } from '../what-are-stocks/what-are-stocks';
import { InvestingSafelyPage } from '../investing-safely/investing-safely';
import { Search } from '../../models/search';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html'
})
export class StocksPage implements OnInit {
  search: Search[];

  ngOnInit() {
    this.search = [

      new Search("What are stocks"),

      new Search("Investing For beginners"),

      new Search("Investing Safely")
    ];
  }





  constructor(public navCtrl: NavController) {
  }
  goToInvestingForBeginners(params) {
    if (!params) params = {};
    this.navCtrl.push(InvestingForBeginnersPage);
  } goToWhatAreStocks(params) {
    if (!params) params = {};
    this.navCtrl.push(WhatAreStocksPage);
  } goToInvestingSafely(params) {
    if (!params) params = {};
    this.navCtrl.push(InvestingSafelyPage);
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



