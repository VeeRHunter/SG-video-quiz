import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { InappbrowProvider } from '../../providers/inappbrow/inappbrow';

import * as firebase from 'firebase';
import { WebsiteArticlePage } from '../website-article/website-article';


@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html'
})
export class RecommendationsPage {

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
      this.quizList = new Array();
      this.searchList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      for (let list of this.articleList) {
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].readwebsite != null) {
            if (list[this.user.uid].readwebsite) {
              this.searchList.push(list);
            }
          }
          if (list[this.user.uid].readvideo != null) {
            if (list[this.user.uid].readvideo) {
              this.quizList.push(list);
            }
          }
        }
      }
      this.loading.hide();
    });
  }

  goToArticleDetailSearch(index) {
    // this.inappProvider.openWebsite(this.searchList[index].websiteURL);
    this.navCtrl.push(WebsiteArticlePage, { articleParam: this.searchList[index] });
  }

  goToArticleDetailQuiz(index) {
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.quizList[index] });
  }

}
