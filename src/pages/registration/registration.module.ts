import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';

@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage),
    TranslateModule.forChild()
  ],
  exports: [
    RegistrationPage
  ]
})
export class RegistrationPageModule { }
