import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { RegAccountPage } from './reg-account';

@NgModule({
  declarations: [
    RegAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(RegAccountPage),
    TranslateModule.forChild()
  ],
  exports: [
    RegAccountPage
  ]
})
export class RegAccountPageModule { }
