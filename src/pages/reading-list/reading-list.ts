import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import * as firebase from 'firebase';
import { WebsiteArticlePage } from '../website-article/website-article';

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
        // if (typeof (list[this.user.uid]) != "undefined") {
        //   if (list[this.user.uid].likewebsite != null) {
        //     if (list[this.user.uid].likewebsite) {
        //       this.searchList.push(list);
        //     }
        //   }
        //   if (list[this.user.uid].likevideo != null) {
        //     if (list[this.user.uid].likevideo) {
        //       this.quizList.push(list);
        //     }
        //   }
        // }
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].likewebsite != null) {
            if (list[this.user.uid].likewebsite) {
              this.searchList.push(list);
            }
          }
          else if (list[this.user.uid].likevideo != null) {
            if (list[this.user.uid].likevideo) {
              this.searchList.push(list);
            }
          }
          else if (list[this.user.uid].likevideo != null && list[this.user.uid].likewebsite != null) {
            if (list[this.user.uid].likevideo || list[this.user.uid].likewebsite) {
              this.searchList.push(list);
            }
          }
        }
      }
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    if (typeof (this.searchList[index][this.user.uid]) != "undefined") {
      if (typeof (this.searchList[index][this.user.uid].likevideo) != "undefined"
        && this.searchList[index][this.user.uid].likevideo) {
        if (typeof (this.searchList[index][this.user.uid].likewebsite) != "undefined"
          && this.searchList[index][this.user.uid].likewebsite) {
          this.navCtrl.push(WebsiteArticlePage, { articleParam: this.searchList[index] });
        } else {
          this.navCtrl.push(ArticleDetailPage, { articleParam: this.searchList[index] });
        }
      } else {
        if (typeof (this.searchList[index][this.user.uid].likewebsite) != "undefined"
          && this.searchList[index][this.user.uid].likewebsite) {
          this.navCtrl.push(WebsiteArticlePage, { articleParam: this.searchList[index] });
        } else {
          this.navCtrl.push(ArticleDetailPage, { articleParam: this.searchList[index] });
        }
      }
    }
  }

  goToVideoArticleDetail(index) {
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.searchList[index] });
  }

  likeArticle(index) {
    this.firebaseProvider.updateLikeVideoState(this.searchList[index].articlename, false);
    this.firebaseProvider.updateLikeWebsiteState(this.searchList[index].articlename, false);
  }

  likeWebsiteState(index) {
    this.firebaseProvider.updateLikeWebsiteState(this.searchList[index].articlename, false);
  }

}
