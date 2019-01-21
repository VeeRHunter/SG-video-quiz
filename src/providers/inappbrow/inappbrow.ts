
import { Injectable } from '@angular/core';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the InappbrowProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InappbrowProvider {

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(
    public iab: InAppBrowser,
  ) {
    console.log('Hello InappbrowProvider Provider');
  }

  openWebsite(link) {
    let target = "_blank";
    this.iab.create(link, target, this.options);
  }

}
