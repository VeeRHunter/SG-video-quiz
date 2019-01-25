import { NavController } from 'ionic-angular';
import { Search } from '../../models/search';
import { Component, OnInit } from '@angular/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';

@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html'
})
export class StocksPage {
  search: Search[];

  public eachArticle: any = {};
  public stocksList: any[];
  public showList: any[];

  public searchKey = "";

  public customList: any[];
  public nameList = ['What are stocks', 'Investing for Beginners', 'Investing safely'];

  constructor(
    public navCtrl: NavController,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    this.getArticleList();
  }

  getArticleList() {

    this.dataProvider.getArticlesList().snapshotChanges().subscribe((result) => {
      this.stocksList = new Array();
      this.customList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        if (this.eachArticle[listKey].type == "Stocks" && this.eachArticle[listKey].videoURL != null) {
          this.stocksList.push(this.eachArticle[listKey]);
        }
      }
      for (let listString of this.nameList) {
        for (let list of this.stocksList) {
          if (listString == list.articlename) {
            this.customList.push(list);
          }
        }
      }
      this.getItems(event);
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
  }

  getItems(ev: any) {
    this.showList = new Array();
    if (this.searchKey == "") {
      for (let list of this.customList) {
        this.showList.push(list);
      }
    } else {
      for (let list of this.customList) {
        if (this.dataProvider.compareTwoString(list.articlename, this.searchKey)) {
          this.showList.push(list);
        }
      }
    }
  }
}



