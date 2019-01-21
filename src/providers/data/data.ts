import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../loading/loading';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(
    public angularfire: AngularFireDatabase,
    public loading: LoadingProvider,
  ) {
    console.log('Hello DataProvider Provider');
  }

  compareTwoString(str1, str2) {
    let compareState = true;
    for (let i = 0; i < str2.length; i++) {
      if (i < str1.length - 1) {
        if (str1.charAt(i).toLowerCase() == str2.charAt(i).toLowerCase()) {
        } else {
          compareState = false;
        }
      }
    }
    return compareState;
  }

  getArticlesList() {
    if (this.loading.loading) {

    } else {
      this.loading.hide();
      this.loading.show();
    }
    return this.angularfire.object('/Articles/');
  }

  getArticleWithName(articleName) {
    if (this.loading.loading) {

    } else {
      this.loading.hide();
      this.loading.show();
    }
    return this.angularfire.object('/Articles/' + articleName + '/');
  }

}
