import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { ToastProvider } from '../toast/toast';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(
    public toast: ToastProvider,
  ) {
    console.log('Hello FirebaseProvider Provider');
  }

  updateReadingVideoState(articleName) {
    firebase.database().ref('Articles/' + articleName).update({ 'readvideo': true });
  }

  updateReadingWebsiteState(articleName) {
    firebase.database().ref('Articles/' + articleName).update({ 'readwebsite': true });
  }

  updateHistory(articleName) {
    firebase.database().ref('Articles/' + articleName).update({ 'history': true });
  }

  updateLikeState(articleName, likeState) {
    firebase.database().ref('Articles/' + articleName).update({ 'liked': likeState });
  }

  updateStarState(articleName, starRate) {
    firebase.database().ref('Articles/' + articleName).update({ 'starrating': starRate });
  }

  updateQuestinAnswers(articleName, questinList) {
    firebase.database().ref('Articles/' + articleName).update({ 'quiz-answer': questinList });
  }


}
