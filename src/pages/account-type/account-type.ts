import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-account-type',
  templateUrl: 'account-type.html'
})
export class AccountTypePage {
  // The account fields for the AccountType form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  accountType: { descricao: string } = {
    descricao: '',
  };

  // Our translated text strings
  private accountTypeErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('ACCOUNT_TYPE_ERROR').subscribe((value) => {
      this.accountTypeErrorString = value;
    })
  }

  // Attempt to AccountTypePage in through our User service
  doAccountTypePage() {
    this.user.login(this.accountType).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.accountTypeErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
