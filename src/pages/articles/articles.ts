import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { RecommendationsPage } from '../recommendations/recommendations';
import { ReadingListPage } from '../reading-list/reading-list';
import { HistoryPage } from '../history/history';
import { VideoReadingListPage } from '../video-reading-list/video-reading-list';
import { VideoHistoryPage } from '../video-history/video-history';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html'
})
export class ArticlesPage {

  constructor(public navCtrl: NavController) {
  }
  goToSearch(params) {
    if (!params) params = {};
    this.navCtrl.push(SearchPage);
  }

  goToRecommendations(params) {
    if (!params) params = {};
    this.navCtrl.push(RecommendationsPage);
  }

  goToWebsiteReadingList(params) {
    if (!params) params = {};
    this.navCtrl.push(ReadingListPage);
  }

  goToVideoReadingList(params) {
    if (!params) params = {};
    this.navCtrl.push(VideoReadingListPage);
  }

  goToWebsiteHistory(params) {
    if (!params) params = {};
    this.navCtrl.push(HistoryPage);
  }

  goToVideoHistory(params) {
    if (!params) params = {};
    this.navCtrl.push(VideoHistoryPage);
  }
}
