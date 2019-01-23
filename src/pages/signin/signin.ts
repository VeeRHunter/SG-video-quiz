import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from '../../providers/auth/auth';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public signInParam = {
    "email": "",
    "password": ""
  }

  public forgotEmail = "";

  public signForm = true;

  public emailCtrl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  public emailForgotCtrl = new FormControl('', [
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
    console.log('ionViewDidLoad SigninPage');
    this.authProvider.setNavController(this.navCtrl);
  }

  authSubmit(userData) {
    if (userData.valid && this.emailCtrl.valid) {
      this.authProvider.emailLogin(this.signInParam.email, this.signInParam.password);
    }
  }

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
