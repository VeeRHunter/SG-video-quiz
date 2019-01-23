import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebsiteArticlePage } from './website-article';

@NgModule({
  declarations: [
    WebsiteArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(WebsiteArticlePage),
  ],
})
export class WebsiteArticlePageModule {}
