import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import * as firebase from 'firebase';
import { LoadingProvider } from '../loading/loading';
import { ToastProvider } from '../toast/toast';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../../pages/signin/signin';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public navCtrl: NavController;

  constructor(
    public loading: LoadingProvider,
    public toast: ToastProvider,
  ) {
    console.log('Hello AuthProvider Provider');
  }


  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  signUpUser(userData) {
    this.loading.show();
    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      .then((success) => {

        let user = firebase.auth().currentUser;

        let dateCreated = new Date();
        firebase.database().ref('accounts/' + user.uid).set({
          dateCreated,
          firstname: userData.firstname,
          lastname: userData.lastname,
          userId: user.uid,
          email: user.email
        });
        this.loading.hide();
        this.navCtrl.push(SigninPage);

      })
      .catch((error) => {
        console.log(error);
        this.loading.hide();
        let code = error["code"];
        this.toast.show(code);
      });
  }

  emailLogin(email, password) {
    this.loading.show();
    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
      this.loading.hide();
      console.log('success');
      this.saveCurrentUser(email, password);
      this.navCtrl.setRoot(HomePage);
    }, error => {
      this.loading.hide();
      console.log('failed');
      this.toast.show(error["code"]);
    });
  }

  saveCurrentUser(email, password) {
    const userInfo = { "email": email, "password": password };
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
  }

  getCurrentLoggedUser() {
    if (localStorage.getItem("currentUser") === null || localStorage.getItem("currentUser") === ""
      || typeof (localStorage.getItem("currentUser")) === "undefined") {
      return "";
    } else {
      return JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  sendPasswordReset(email) {
    console.log(email);
    if (email != null || email != undefined || email != "") {
      this.loading.show();
      firebase.auth().sendPasswordResetEmail(email).then((success) => {
        this.loading.hide();
        this.toast.show(email);
      }).catch((error) => {
        this.loading.hide();
        this.toast.show(error["code"]);
      });
    }
  }

  logout() {
    this.loading.show();
    // Sign the user out on Firebase
    firebase.auth().signOut().then((success) => {
      // Clear navigation stacks
      this.loading.hide();
      localStorage.setItem("currentUser", "");
      // this.navCtrl.setRoot(WelcomePage);
    });
  }

}
