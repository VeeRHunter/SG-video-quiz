import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signUpParam = {
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": ""
  }

  public emailCtrl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  authSubmit(userData) {
    if (userData.valid && this.emailCtrl.valid) {
      this.authProvider.signUpUser(this.signUpParam);
    }
  }

}
