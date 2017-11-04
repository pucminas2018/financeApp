import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { InvoicePage } from './invoice';

@NgModule({
  declarations: [
    InvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicePage),
    TranslateModule.forChild()
  ],
  exports: [
    InvoicePage
  ]
})
export class InvoicePageModule { }
