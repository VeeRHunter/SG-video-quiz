import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { InappbrowProvider } from '../../providers/inappbrow/inappbrow';

import * as firebase from 'firebase';
import { WebsiteArticlePage } from '../website-article/website-article';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public eachArticle: any = {};
  public articleList: any[];
  public showList: any[];

  public searchFilter = "";

  public user: any;

  public searchKey = "";
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
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.eachArticle[listKey].likewebsite = false;
        if (this.eachArticle[listKey].websiteURL != null) {
          this.articleList.push(this.eachArticle[listKey]);
        }
      }
      for (let list of this.articleList) {
        if (typeof (list[this.user.uid]) != "undefined") {
          if (list[this.user.uid].likewebsite != null) {
            list.likewebsite = list[this.user.uid].likewebsite;
          }
        }
      }
      this.getItems();
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {

    this.firebaseProvider.updateReadingWebsiteState(this.showList[index].articlename);
    this.firebaseProvider.updateHistory(this.showList[index].articlename);
    this.firebaseProvider.updateReadingWebsiteCategory(this.showList[index].articlename, this.showList[index].type)

    this.inappProvider.openWebsite(this.showList[index].websiteURL);
    // this.navCtrl.push(WebsiteArticlePage, { articleParam: this.showList[index] });
  }

  likeArticle(index) {
    this.showList[index].likewebsite = !this.showList[index].likewebsite;
    this.firebaseProvider.updateLikeWebsiteState(this.showList[index].articlename, this.showList[index].likewebsite);
  }

  filterResult() {
    this.getItems();
  }

  getItems() {
    this.showList = new Array();
    if (this.searchKey == "") {
      if (this.searchFilter == "") {
        for (let list of this.articleList) {
          this.showList.push(list);
        }
      } else {
        for (let list of this.articleList) {
          if (list.type == this.searchFilter) {
            this.showList.push(list);
          }
        }
      }
    } else {
      if (this.searchFilter == "") {
        for (let list of this.articleList) {
          if (this.dataProvider.compareTwoString(list.articlename, this.searchKey)) {
            this.showList.push(list);
          }
        }
      } else {
        for (let list of this.articleList) {
          if (list.type == this.searchFilter && this.dataProvider.compareTwoString(list.articlename, this.searchKey)) {
            this.showList.push(list);
          }
        }
      }
    }
  }

}



