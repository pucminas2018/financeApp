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
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to th;e type
  creditCard: { descricao: string,  limite: number, operadora: string, conta: object} = {
    descricao: "",
    limite: 0,
    operadora: '',
    conta: {codConta: 0}
  };

  
  // Our translated text strings
  private creditCardErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: CreditCards,
    public translateService: TranslateService) {
    this.creditCard = navParams.get('item') || items.defaultItem;
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.creditCardErrorString = value;
    })
  }

  doCreditCard() {
    // Attempt to login in through our User service
    this.user.signup(this.creditCard).subscribe((resp) => {
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
}
