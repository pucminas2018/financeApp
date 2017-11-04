import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListCategoryPage } from './list-category';

@NgModule({
  declarations: [
    ListCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCategoryPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListCategoryPage
  ]
})
export class ListCategoryPageModule { }
