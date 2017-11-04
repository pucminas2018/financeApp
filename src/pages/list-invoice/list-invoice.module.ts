import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListInvoicePage } from './list-invoice';

@NgModule({
  declarations: [
    ListInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ListInvoicePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListInvoicePage
  ]
})
export class ListInvoicePageModule { }
