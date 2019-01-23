import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { VideosOnInvestmentsPage } from '../pages/videos-on-investments/videos-on-investments';
import { BondsPage } from '../pages/bonds/bonds';
import { StocksPage } from '../pages/stocks/stocks';
import { InsurancePage } from '../pages/insurance/insurance';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ArticlesPage } from '../pages/articles/articles';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { ReadingListPage } from '../pages/reading-list/reading-list';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { SearchPage } from '../pages/search/search';


import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoadingProvider } from '../providers/loading/loading';
import { ServiceProvider } from '../providers/service/service';
import { DataProvider } from '../providers/data/data';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ToastProvider } from '../providers/toast/toast';
import { HttpClientModule } from '@angular/common/http';
import { ArticleDetailPage } from '../pages/article-detail/article-detail';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InappbrowProvider } from '../providers/inappbrow/inappbrow';
import { ChartsModule } from 'ng2-charts';
import { AuthProvider } from '../providers/auth/auth';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { WebsiteArticlePage } from '../pages/website-article/website-article';


const firebaseConfig = {
  apiKey: "AIzaSyAV_uyBCHubtBWF1LioFqfCvfAkCzvhi60",
  authDomain: "msaproj-de614.firebaseapp.com",
  databaseURL: "https://msaproj-de614.firebaseio.com",
  projectId: "msaproj-de614",
  storageBucket: "msaproj-de614.appspot.com",
  messagingSenderId: "830232158947"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    VideosOnInvestmentsPage,
    BondsPage,
    StocksPage,
    InsurancePage,
    ArticlesPage,
    HistoryPage,
    HomePage,
    ReadingListPage,
    RecommendationsPage,
    SearchPage,
    ArticleDetailPage,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    WebsiteArticlePage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ChartsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideosOnInvestmentsPage,
    BondsPage,
    StocksPage,
    InsurancePage,
    ArticlesPage,
    HistoryPage,
    HomePage,
    ReadingListPage,
    RecommendationsPage,
    SearchPage,
    ArticleDetailPage,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    WebsiteArticlePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    ServiceProvider,
    DataProvider,
    FirebaseProvider,
    ToastProvider,
    InappbrowProvider,
    AuthProvider
  ]
})
export class AppModule { }