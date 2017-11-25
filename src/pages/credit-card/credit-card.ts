import { Api } from './../../providers/api/api';
import { CreditCard } from './domain/credit-card';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, CreditCards } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-credit-card',
  templateUrl: 'credit-card.html'
})

export class CreditCardPage {

  option: any = {"Content-Type":"application/json"}
  _user: any;
  creditCard: CreditCard = new CreditCard();
  
  // Our translated text strings
  private creditCardErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: CreditCards,
    public translateService: TranslateService,
    public api: Api) {
    this.creditCard = navParams.get('item') || items.defaultItem;
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.creditCardErrorString = value;
    })
  }

  doCreditCard() {
    // Attempt to login in through our User service
    this.postCreditCard(this.creditCard).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to credit Card
      let toast = this.toastCtrl.create({
        message: this.creditCardErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  postCreditCard(accountInfo: any) {
    let seq = this.api.post('cartao-credito', accountInfo, this.option).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  _loggedIn(resp) {
    this._user = resp.user;
  }

}
