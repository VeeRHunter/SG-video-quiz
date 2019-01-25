import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import * as firebase from 'firebase';
import { WebsiteArticlePage } from '../website-article/website-article';

/**
 * Generated class for the VideoReadingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-reading-list',
  templateUrl: 'video-reading-list.html',
})
export class VideoReadingListPage {

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
          if (list[this.user.uid].likevideo != null) {
            if (list[this.user.uid].likevideo) {
              this.searchList.push(list);
            }
          }
        }
      }
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.searchList[index] });
  }

  likeArticle(index) {
    this.firebaseProvider.updateLikeVideoState(this.searchList[index].articlename, false);
  }

}
