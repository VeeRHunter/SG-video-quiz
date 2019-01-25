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

  public showSearch = false;
  public showVideo = false;

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
      let categoryList = new Array();
      let videoCategoryList = new Array();

      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      // quiz part
      for (let list of this.articleList) {
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].quizfailed != null) {
            if (list[this.user.uid].quizfailed) {
              videoCategoryList.push(list.type);
              // this.quizList.push(list);
            }
          }
        }
      }
      for (let listCategory of videoCategoryList) {
        for (let list of this.articleList) {
          if (listCategory == list.type && list.websiteURL != null) {
            this.quizList.push(list);
            // if (list[this.user.uid].quizfailed != null) {
            //   if (list[this.user.uid].quizfailed) {
            //     // this.quizList.push(list);
            //   }
            // }
          }
        }
      }

      // search result part
      for (let list of this.articleList) {
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].readcategory != null) {
            let enableCat = true;
            for (let listCategory of categoryList) {
              if (listCategory == list[this.user.uid].readcategory) {
                enableCat = false;
              }
            }
            if (enableCat) {
              categoryList.push(list[this.user.uid].readcategory);
            }
          }
        }
      }
      for (let list of this.articleList) {
        for (let listCategory of categoryList) {
          if (list.websiteURL != null) {
            if (listCategory == list.type) {
              if (typeof (list[this.user.uid]) != "undefined") {
                if (list[this.user.uid].readwebsite == null) {
                  this.searchList.push(list);
                }
              }
            } else {
              // this.searchList.push(list);
            }
          }
        }
      }
      if (this.searchList.length == 0) {
        this.showSearch = false;
      } else {
        this.showSearch = true;
      }
      if (this.quizList.length == 0) {
        this.showVideo = false;
      } else {
        this.showVideo = true;
      }
      this.loading.hide();
    });
  }

  goToArticleDetailSearch(index) {
    this.inappProvider.openWebsite(this.searchList[index].websiteURL);
    // this.navCtrl.push(WebsiteArticlePage, { articleParam: this.searchList[index] });
  }

  goToArticleDetailQuiz(index) {
    this.inappProvider.openWebsite(this.quizList[index].websiteURL);
    // this.navCtrl.push(WebsiteArticlePage, { articleParam: this.quizList[index] });
  }

}
