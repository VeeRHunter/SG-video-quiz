import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastProvider } from '../../providers/toast/toast';

import * as firebase from 'firebase';

/**
 * Generated class for the WebsiteArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-website-article',
  templateUrl: 'website-article.html',
})
export class WebsiteArticlePage {

  public articleDeta: any;
  public eachArticle: any = {};
  public enableShow = false;
  public showChart = false;

  public checked = 0;
  public unchcked = 0;

  public selectedOption: any;

  public likedState = false;

  public user: any;


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
    console.log('ionViewDidLoad WebsiteArticlePage');
    this.getArticleWithName();
  }

  getArticleWithName() {
    let params = this.navParams.get('articleParam').articlename;
    this.dataProvider.getArticleWithName(params).snapshotChanges().subscribe((result) => {

      this.user = firebase.auth().currentUser;

      this.eachArticle = result.payload.val();
      this.articleDeta = this.eachArticle;
      if (typeof (this.articleDeta[this.user.uid]) != "undefined") {
        if (this.articleDeta[this.user.uid].likewebsite != null) {
          this.likedState = this.articleDeta[this.user.uid].likewebsite;
        } else {
        }
      }
      this.articleDeta.websiteURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.articleDeta.websiteURL);
      this.enableShow = true;
      this.firebaseProvider.updateReadingWebsiteState(this.articleDeta.articlename);
      this.firebaseProvider.updateHistory(this.articleDeta.articlename);
      this.loading.hide();
    }, error => {
      console.log(error);
    });
  }

  likeArticle() {
    this.likedState = !this.likedState;
    this.firebaseProvider.updateLikeWebsiteState(this.articleDeta.articlename, this.likedState);
  }


}
