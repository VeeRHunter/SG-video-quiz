import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { RecommendationsPage } from '../recommendations/recommendations';
import { ReadingListPage } from '../reading-list/reading-list';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html'
})
export class ArticlesPage {

  constructor(public navCtrl: NavController) {
  }
  goToSearch(params){
    if (!params) params = {};
    this.navCtrl.push(SearchPage);
  }goToRecommendations(params){
    if (!params) params = {};
    this.navCtrl.push(RecommendationsPage);
  }goToReadingList(params){
    if (!params) params = {};
    this.navCtrl.push(ReadingListPage);
  }goToHistory(params){
    if (!params) params = {};
    this.navCtrl.push(HistoryPage);
  }
}
