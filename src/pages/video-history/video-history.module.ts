import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoHistoryPage } from './video-history';

@NgModule({
  declarations: [
    VideoHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoHistoryPage),
  ],
})
export class VideoHistoryPageModule {}
