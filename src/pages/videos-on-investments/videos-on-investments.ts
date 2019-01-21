import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BondsPage } from '../bonds/bonds';
import { InvestingBasicsPage } from '../investing-basics/investing-basics';
import { Investing101Page } from '../investing101/investing101';
import { HowBondInvestingWorksPage } from '../how-bond-investing-works/how-bond-investing-works';
import { StocksPage } from '../stocks/stocks';
import { InvestingForBeginnersPage } from '../investing-for-beginners/investing-for-beginners';
import { WhatAreStocksPage } from '../what-are-stocks/what-are-stocks';
import { InvestingSafelyPage } from '../investing-safely/investing-safely';
import { InsurancePage } from '../insurance/insurance';
import { HowInsuranceWorksPage } from '../how-insurance-works/how-insurance-works';
import { LifeInsurancePage } from '../life-insurance/life-insurance';
import { WhyInvestInInsurancePage } from '../why-invest-in-insurance/why-invest-in-insurance';

@Component({
  selector: 'page-videos-on-investments',
  templateUrl: 'videos-on-investments.html'
})
export class VideosOnInvestmentsPage {

  constructor(public navCtrl: NavController) {
  }
  goToBonds(params){
    if (!params) params = {};
    this.navCtrl.push(BondsPage);
  }goToInvestingBasics(params){
    if (!params) params = {};
    this.navCtrl.push(InvestingBasicsPage);
  }goToInvesting101(params){
    if (!params) params = {};
    this.navCtrl.push(Investing101Page);
  }goToHowBondInvestingWorks(params){
    if (!params) params = {};
    this.navCtrl.push(HowBondInvestingWorksPage);
  }goToStocks(params){
    if (!params) params = {};
    this.navCtrl.push(StocksPage);
  }goToInvestingForBeginners(params){
    if (!params) params = {};
    this.navCtrl.push(InvestingForBeginnersPage);
  }goToWhatAreStocks(params){
    if (!params) params = {};
    this.navCtrl.push(WhatAreStocksPage);
  }goToInvestingSafely(params){
    if (!params) params = {};
    this.navCtrl.push(InvestingSafelyPage);
  }goToInsurance(params){
    if (!params) params = {};
    this.navCtrl.push(InsurancePage);
  }goToHowInsuranceWorks(params){
    if (!params) params = {};
    this.navCtrl.push(HowInsuranceWorksPage);
  }goToLifeInsurance(params){
    if (!params) params = {};
    this.navCtrl.push(LifeInsurancePage);
  }goToWhyInvestInInsurance(params){
    if (!params) params = {};
    this.navCtrl.push(WhyInvestInInsurancePage);
  }
}
