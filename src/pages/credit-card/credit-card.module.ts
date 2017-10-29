import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CreditCardPage } from './credit-card';

@NgModule({
  declarations: [
    CreditCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditCardPage),
    TranslateModule.forChild()
  ],
  exports: [
    CreditCardPage
  ]
})
export class CreditCardPageModule { }
