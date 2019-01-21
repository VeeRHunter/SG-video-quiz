import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { ArticleDetailPage } from '../article-detail/article-detail';

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
      this.articleList = new Array();
      this.quizList = new Array();
      this.searchList = new Array();
      this.eachArticle = result.payload.val();
      for (var listKey in this.eachArticle) {
        this.articleList.push(this.eachArticle[listKey]);
      }
      for (let list of this.articleList) {
        if (list.reading) {
          if (list["quiz-answer"] != null) {
            this.quizList.push(list);
          } else {
            this.searchList.push(list);
          }
        }
      }
      console.log(this.quizList);
      console.log(this.searchList);
      this.loading.hide();
    });
  }

  goToArticleDetailSearch(index) {
    console.log(index);
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.searchList[index] });
  }

  goToArticleDetailQuiz(index) {
    console.log(index);
    this.navCtrl.push(ArticleDetailPage, { articleParam: this.quizList[index] });
  }

}
