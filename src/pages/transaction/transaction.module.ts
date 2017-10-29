import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TransactionPage } from './transaction';

@NgModule({
  declarations: [
    TransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionPage),
    TranslateModule.forChild()
  ],
  exports: [
    TransactionPage
  ]
})
export class TransactionPageModule { }
