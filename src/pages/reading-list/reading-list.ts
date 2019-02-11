import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import * as firebase from 'firebase';
import { WebsiteArticlePage } from '../website-article/website-article';
import { InappbrowProvider } from '../../providers/inappbrow/inappbrow';

@Component({
  selector: 'page-reading-list',
  templateUrl: 'reading-list.html'
})
export class ReadingListPage {

  public eachArticle: any = {};
  public articleList: any[];

  public searchList: any[];
  public quizList: any[];

  public searchKey = "";

  public user: any;

  constructor(
    public navCtrl: NavController,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
    public firebaseProvider: FirebaseProvider,
    public inappbrowProvider:InappbrowProvider
  ) {
  }

  ionViewDidLoad() {
    this.getArticleList();
  }

  getArticleList() {

    this.dataProvider.getArticlesList().snapshotChanges().subscribe((result) => {
      this.user = firebase.auth().currentUser;
      this.articleList = new Array();
      this.searchList = new Array();
      this.quizList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      for (let list of this.articleList) {
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].likewebsite != null) {
            if (list[this.user.uid].likewebsite) {
              this.searchList.push(list);
            }
          }
        }
      }
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    this.firebaseProvider.updateReadingWebsiteState(this.searchList[index].articlename);
    this.firebaseProvider.updateHistory(this.searchList[index].articlename);
    this.firebaseProvider.updateReadingWebsiteCategory(this.searchList[index].articlename, this.searchList[index].type);
    // this.navCtrl.push(WebsiteArticlePage, { articleParam: this.searchList[index] });
    this.inappbrowProvider.openWebsite(this.searchList[index].websiteURL);
  }

  likeArticle(index) {
    this.firebaseProvider.updateLikeWebsiteState(this.searchList[index].articlename, false);
  }

}
