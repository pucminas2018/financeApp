import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListCreditCardPage } from './list-credit-card';

@NgModule({
  declarations: [
    ListCreditCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCreditCardPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListCreditCardPage
  ]
})
export class ListCreditCardPageModule { }
