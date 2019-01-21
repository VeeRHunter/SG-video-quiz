import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { VideosOnInvestmentsPage } from '../pages/videos-on-investments/videos-on-investments';
import { BondsPage } from '../pages/bonds/bonds';
import { StocksPage } from '../pages/stocks/stocks';
import { InsurancePage } from '../pages/insurance/insurance';
import { InvestingBasicsPage } from '../pages/investing-basics/investing-basics';
import { Investing101Page } from '../pages/investing101/investing101';
import { HowBondInvestingWorksPage } from '../pages/how-bond-investing-works/how-bond-investing-works';
import { InvestingForBeginnersPage } from '../pages/investing-for-beginners/investing-for-beginners';
import { InvestingSafelyPage } from '../pages/investing-safely/investing-safely';
import { WhatAreStocksPage } from '../pages/what-are-stocks/what-are-stocks';
import { HowInsuranceWorksPage } from '../pages/how-insurance-works/how-insurance-works';
import { WhyInvestInInsurancePage } from '../pages/why-invest-in-insurance/why-invest-in-insurance';
import { LifeInsurancePage } from '../pages/life-insurance/life-insurance';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ArticlesPage } from '../pages/articles/articles';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { ReadingListPage } from '../pages/reading-list/reading-list';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { Search } from '../models/search';
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    VideosOnInvestmentsPage,
    BondsPage,
    StocksPage,
    InsurancePage,
    InvestingBasicsPage,
    Investing101Page,
    HowBondInvestingWorksPage,
    InvestingForBeginnersPage,
    InvestingSafelyPage,
    WhatAreStocksPage,
    HowInsuranceWorksPage,
    WhyInvestInInsurancePage,
    LifeInsurancePage,
    ArticlesPage,
    HistoryPage,
    HomePage,
    ReadingListPage,
    RecommendationsPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideosOnInvestmentsPage,
    BondsPage,
    StocksPage,
    InsurancePage,
    InvestingBasicsPage,
    Investing101Page,
    HowBondInvestingWorksPage,
    InvestingForBeginnersPage,
    InvestingSafelyPage,
    WhatAreStocksPage,
    HowInsuranceWorksPage,
    WhyInvestInInsurancePage,
    LifeInsurancePage,
    ArticlesPage,
    HistoryPage,
    HomePage,
    ReadingListPage,
    RecommendationsPage,
    SearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }