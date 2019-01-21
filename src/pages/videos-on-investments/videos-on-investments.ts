import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BondsPage } from '../bonds/bonds';
import { StocksPage } from '../stocks/stocks';
import { InsurancePage } from '../insurance/insurance';

@Component({
  selector: 'page-videos-on-investments',
  templateUrl: 'videos-on-investments.html'
})
export class VideosOnInvestmentsPage {

  constructor(public navCtrl: NavController) {
  }

  goToBonds(params) {
    if (!params) params = {};
    this.navCtrl.push(BondsPage);
  }
  goToStocks(params) {
    if (!params) params = {};
    this.navCtrl.push(StocksPage);
  }
  goToInsurance(params) {
    if (!params) params = {};
    this.navCtrl.push(InsurancePage);
  }
}
