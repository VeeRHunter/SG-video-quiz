import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { InappbrowProvider } from '../../providers/inappbrow/inappbrow';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  public eachArticle: any = {};
  public articleList: any[];
  public showList: any[];

  public searchKey = "";

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
      this.articleList = new Array();
      this.showList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      for (let list of this.articleList) {
        if (list.readvideo || list.readwebsite) {
          this.showList.push(list);
        }
      }
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    if (this.showList[index].readvideo != null) {
      if (this.showList[index].readwebsite != null) {
        this.inappProvider.openWebsite(this.showList[index].websiteURL);
      } else {
        this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
      }
    } else {
      if (this.showList[index].readwebsite != null) {
        this.inappProvider.openWebsite(this.showList[index].websiteURL);
      } else {
        this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
      }
    }
    // this.inappProvider.openWebsite(this.showList[index].websiteURL);
    // this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
  }


}
