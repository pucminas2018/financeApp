import { Api } from './../../providers/api/api';
import { Transaction } from './domain/transaction';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, Items} from '../../providers/providers';
import { MainPage } from '../pages';



@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})

export class TransactionPage {

  transaction: Transaction = new Transaction();
  option: any = {"Content-Type":"application/json"}
  _user: any;
  

  // Our translated text strings
  private transactionErrorString: string;

  constructor(public navCtrl: NavController, 
    public user: User, 
    public navParams: NavParams, 
    public items: Items,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

      this.transaction = navParams.get('item') || items.defaultItem;
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.transactionErrorString = value;
    })
  }

  doTransaction() {
    // Attempt to login in through our User service
    this.user.signup(this.transaction).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to credit transaction
      let toast = this.toastCtrl.create({
        message: this.transactionErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  postSignup(accountInfo: any) {
    let seq = this.api.post('usuario', accountInfo, this.option).share();

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
