import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-reading-list',
  templateUrl: 'reading-list.html'
})
export class ReadingListPage {

  public eachArticle: any = {};
  public articleList: any[];
  public showList: any[];

  public searchKey = "";

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
      this.articleList = new Array();
      this.showList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      for (let list of this.articleList) {
        if (list.liked) {
          this.showList.push(list);
        }
      }
      console.log(this.showList);
      this.loading.hide();
    });
  }

  goToArticleDetail(index) {
    console.log(index);
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.showList[index] });
  }

  likeArticle(index) {
    this.firebaseProvider.updateLikeState(this.showList[index].articlename, false);
  }

}
