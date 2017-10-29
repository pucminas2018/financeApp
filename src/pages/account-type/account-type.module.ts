import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AccountTypePage } from './account-type';

@NgModule({
  declarations: [
    AccountTypePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountTypePage),
    TranslateModule.forChild()
  ],
  exports: [
    AccountTypePage
  ]
})
export class AccountTypePageModule { }
