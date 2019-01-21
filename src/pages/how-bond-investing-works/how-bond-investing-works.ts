import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Search } from '../../models/search';
@Component({
  selector: 'page-how-bond-investing-works',
  templateUrl: 'how-bond-investing-works.html'
})
export class HowBondInvestingWorksPage {
  search: Search;
  bonds="How Bond Investing Works";
  invest101="Investing 101";
  investbasic="Investing Basics";
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    let name = navParams.get('name');
    this.search = new Search (name);
  }
  
}
