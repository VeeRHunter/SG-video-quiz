import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoReadingListPage } from './video-reading-list';

@NgModule({
  declarations: [
    VideoReadingListPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoReadingListPage),
  ],
})
export class VideoReadingListPageModule {}
