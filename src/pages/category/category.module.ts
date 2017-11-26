import { UserLogged } from './../user-logged';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CategoryPage } from './category';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    TranslateModule.forChild(),
    UserLogged
  ],
  exports: [
    CategoryPage
  ]
})
export class CategoryPageModule { }
