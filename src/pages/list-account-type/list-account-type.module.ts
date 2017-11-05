import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListAccountTypePage } from './list-account-type';

@NgModule({
  declarations: [
    ListAccountTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ListAccountTypePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListAccountTypePage
  ]
})
export class ListAccountTypePageModule { }
