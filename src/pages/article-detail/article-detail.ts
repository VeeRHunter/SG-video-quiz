import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { FirebaseProvider } from '../../providers/firebase/firebase';


import { DomSanitizer } from '@angular/platform-browser';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../home/home';


/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {

  public articleDeta: any;
  public eachArticle: any = {};
  public enableShow = false;

  public selectedOption: any;

  public starRating: any;
  public starList = [1, 2, 3, 4, 5];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
    public firebaseProvider: FirebaseProvider,
    public sanitizer: DomSanitizer,
    public toast: ToastProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailPage');
    this.getArticleWithName();
  }

  getArticleWithName() {
    let params = this.navParams.get('articleParam').articlename;
    console.log(params);
    this.dataProvider.getArticleWithName(params).snapshotChanges().subscribe((result) => {
      this.eachArticle = result.payload.val();
      for (let list of this.eachArticle.questions) {
        list.selectedanswer = "";
      }
      if (this.eachArticle.starrating != null) {

      } else {
        this.eachArticle.starrating = -1;
      }
      this.articleDeta = this.eachArticle;
      this.starRating = this.articleDeta.starrating;
      console.log(typeof (this.starRating));
      console.log((this.starRating));
      this.articleDeta.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.articleDeta.videoURL);
      console.log(this.eachArticle);
      this.enableShow = true;
      this.firebaseProvider.updateReadingState(this.articleDeta.articlename);
      this.firebaseProvider.updateHistory(this.articleDeta.articlename);
      this.loading.hide();
    }, error => {
      console.log(error);
    })
  }

  submitQuiz() {
    console.log(this.countCorrectAnswer());
    if (this.countCorrectAnswer()) {
      this.firebaseProvider.updateQuestinAnswers(this.articleDeta.articlename, this.articleDeta.questions);
      this.navCtrl.setRoot(HomePage);
    } else {
      this.toast.show("You should pass half of these questions for submit");
    }
  }

  countCorrectAnswer() {
    let count = 0;
    for (let list of this.articleDeta.questions) {
      if (list.answer == list.selectedanswer) {
        count++;
      }
    }
    if (count >= (this.articleDeta.questions.length) / 2) {
      return true;
    } else {
      return false;
    }
  }

  clickOption(quizIndex, optIndex) {
    this.articleDeta.questions[quizIndex].selectedanswer = this.articleDeta.questions[quizIndex].options[optIndex].optionname;
  }

  setRating(index) {
    this.starRating = index;
    this.articleDeta.starrating = index;
    this.firebaseProvider.updateStarState(this.articleDeta.articlename, this.articleDeta.starrating);
  }

  likeArticle() {
    this.articleDeta.liked = !this.articleDeta.liked;
    this.firebaseProvider.updateLikeState(this.articleDeta.articlename, this.articleDeta.liked);
  }

}
