import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { InappbrowProvider } from '../../providers/inappbrow/inappbrow';

import * as firebase from 'firebase';
import { WebsiteArticlePage } from '../website-article/website-article';

/**
 * Generated class for the VideoHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-history',
  templateUrl: 'video-history.html',
})
export class VideoHistoryPage {

  public eachArticle: any = {};
  public articleList: any[];
  public showList: any[];

  public searchKey = "";

  public user: any;

  constructor(
    public navCtrl: NavController,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
    public inappProvider: InappbrowProvider,
  ) {
  }

  ionViewDidLoad() {
    this.getArticleList();
  }

  getArticleList() {

    this.dataProvider.getArticlesList().snapshotChanges().subscribe((result) => {
      this.user = firebase.auth().currentUser;
      this.articleList = new Array();
      this.showList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      for (let list of this.articleList) {
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].readvideo != null) {
            if (list[this.user.uid].readvideo) {
              this.showList.push(list);
            }
          }
        }
      }
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
    // this.inappProvider.openWebsite(this.showList[index].websiteURL);
    // this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
  }

}
