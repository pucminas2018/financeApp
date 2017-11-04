import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListRegAccountPage } from './list-reg-account';

@NgModule({
  declarations: [
    ListRegAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(ListRegAccountPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListRegAccountPage
  ]
})
export class ListRegAccountPageModule { }
