import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { ReadingListPage } from '../pages/reading-list/reading-list';
import { HistoryPage } from '../pages/history/history';
import { ArticlesPage } from '../pages/articles/articles';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    RecommendationsPage,
    ReadingListPage,
    HistoryPage,
    ArticlesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    RecommendationsPage,
    ReadingListPage,
    HistoryPage,
    ArticlesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}