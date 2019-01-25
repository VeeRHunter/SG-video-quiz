import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { FirebaseProvider } from '../../providers/firebase/firebase';


import { DomSanitizer } from '@angular/platform-browser';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../home/home';

import * as firebase from 'firebase';


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
  public showChart = false;

  public checked = 0;
  public unchcked = 0;

  public selectedOption: any;

  public starRating: any;
  public starList = [1, 2, 3, 4, 5];

  public likedState = false;

  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';

  public user: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
          }
        },
      ]
    },
    lineOnHover: {
      enabled: true,
      lineColor: '#bbb',
      lineWidth: 1
    },
    // legend: { display: false },
  };

  public barChartData: any[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public dataProvider: DataProvider,
    public firebaseProvider: FirebaseProvider,
    public sanitizer: DomSanitizer,
    public toast: ToastProvider,
    public alertCtrl: AlertController,
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

      console.log(result);
      this.user = firebase.auth().currentUser;
      this.starRating = -1;

      this.eachArticle = result.payload.val();
      for (let list of this.eachArticle.questions) {
        list.selectedanswer = "";
      }
      console.log("here");
      this.articleDeta = this.eachArticle;
      if (typeof (this.articleDeta[this.user.uid]) != "undefined") {
        if (this.articleDeta[this.user.uid].starrating != null) {
          this.starRating = this.articleDeta[this.user.uid].starrating;
        }
        console.log("here");
        if (this.articleDeta[this.user.uid].quizhistory != null) {
          this.setChartData(this.articleDeta[this.user.uid].quizhistory);
        }
        if (this.articleDeta[this.user.uid].likevideo != null) {
          this.likedState = this.articleDeta[this.user.uid].likevideo;
        } else {
        }

      }
      console.log("here");
      let filename = this.articleDeta.videoURL.split('/')[this.articleDeta.videoURL.split('/').length - 1]
      this.articleDeta.videoURL = "https://www.youtube.com/embed/" + filename;
      this.articleDeta.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.articleDeta.videoURL);
      this.articleDeta.videoURL.changingThisBreaksApplicationSecurity.replace()
      this.enableShow = true;
      this.firebaseProvider.updateReadingVideoState(this.articleDeta.articlename);
      this.firebaseProvider.updateHistory(this.articleDeta.articlename);
      this.loading.hide();
    }, error => {
      console.log(error);
    });
  }

  setChartData(arrayList) {
    this.barChartLabels.length = 0;
    this.barChartData = new Array();

    let dataPoints = [];

    for (let i = 0; i < arrayList.length; i++) {
      this.barChartLabels.push((i + 1).toString());
      dataPoints.push(arrayList[i]);
    }
    let chartData = { data: dataPoints, label: 'Quiz History' };
    this.barChartData.push(chartData);
    // setTimeout(() => {
    this.showChart = true;
    // }, 2000);
  }

  submitQuiz() {
    this.countCorrectAnswer();
    if (this.unchcked == 0) {
      let quizHistory = [];
      console.log(this.barChartData);
      if (this.barChartData.length != 0) {
        console.log(this.barChartData.length);
        if (this.barChartData[0].data.length < 5) {
          for (let i = 0; i < this.barChartData[0].data.length; i++) {
            quizHistory.push(this.barChartData[0].data[i]);
          }
        } else {
          for (let i = 1; i < 5; i++) {
            quizHistory.push(this.barChartData[0].data[i]);
          }
        }
      }
      quizHistory.push(this.checked);
      console.log(quizHistory);
      this.firebaseProvider.updateQuizHistoryList(this.articleDeta.articlename, quizHistory);
      if (this.checked >= (this.articleDeta.questions.length) / 2) {
        this.firebaseProvider.updateQuestionPassed(this.articleDeta.articlename);
      } else {
        this.firebaseProvider.updateQuestionFailed(this.articleDeta.articlename);
      }
      this.presentConfirm();
    } else {
      this.toast.show("Please complete all questions to submit");
    }
  }

  countCorrectAnswer() {
    this.unchcked = 0;
    this.checked = 0;
    for (let list of this.articleDeta.questions) {
      if (list.answer == list.selectedanswer) {
        this.checked++;
      }
      if (list.selectedanswer == "") {
        this.unchcked++;
      }
    }
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Quiz Score',
      message: 'Passed ' + this.checked + ' questions of ' + this.articleDeta.questions.length + 'questins',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.quizResult();
          }
        }
      ]
    });
    alert.present();
  }

  quizResult() {
    if (this.checked >= (this.articleDeta.questions.length) / 2) {
      this.firebaseProvider.updateQuestinAnswers(this.articleDeta.articlename, this.articleDeta.questions);
      this.firebaseProvider.updateQuestionPassed(this.articleDeta.articlename);
      this.navCtrl.setRoot(HomePage);
    } else {
      this.firebaseProvider.updateQuestionFailed(this.articleDeta.articlename);
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
    this.likedState = !this.likedState;
    this.firebaseProvider.updateLikeVideoState(this.articleDeta.articlename, this.likedState);
  }


  // events
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

}
