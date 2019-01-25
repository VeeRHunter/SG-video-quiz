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

  updateQuizHistoryList(articleName, quizHistory) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'quizhistory': quizHistory });
  }

  updateReadingVideoState(articleName) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'readvideo': true });
  }

  updateReadingWebsiteState(articleName) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'readwebsite': true });
  }

  updateReadingWebsiteCategory(articleName, categoryType) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'readcategory': categoryType });
  }

  updateHistory(articleName) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'history': true });
  }

  updateLikeState(articleName, likeState) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'liked': likeState });
  }

  updateLikeWebsiteState(articleName, likeState) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'likewebsite': likeState });
  }

  updateLikeVideoState(articleName, likeState) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'likevideo': likeState });
  }

  updateStarState(articleName, starRate) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'starrating': starRate });
  }

  updateQuestinAnswers(articleName, questinList) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'quizanswer': questinList });
  }

  updateQuestionFailed(articleName) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'quizfailed': true });
  }

  updateQuestionPassed(articleName) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('Articles/' + articleName + '/' + user.uid).update({ 'quizfailed': false });
  }


}
