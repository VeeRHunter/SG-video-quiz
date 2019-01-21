import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VideosOnInvestmentsPage } from '../videos-on-investments/videos-on-investments';
import { ArticlesPage } from '../articles/articles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToVideo() {
    this.navCtrl.push(VideosOnInvestmentsPage);
  }

  goToArticles() {
    this.navCtrl.push(ArticlesPage);
  }

}
