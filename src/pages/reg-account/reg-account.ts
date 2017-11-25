import { Api } from './../../providers/api/api';
import { RegAccount } from './domain/reg-account';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, RegAccounts } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-reg-account',
  templateUrl: 'reg-account.html'
})
export class RegAccountPage {
  regAccount: RegAccount = new RegAccount();
  option: any = {"Content-Type":"application/json"}
  _user: any;

  private regAccountErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams, 
    public items: RegAccounts,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

      this.regAccount = navParams.get('item') || items.defaultItem;
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.regAccountErrorString = value;
    })
  }

  doRegAccount() {
    // Attempt to login in through our User service
    this.postRegAccount(this.regAccount).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to credit Card
      let toast = this.toastCtrl.create({
        message: this.regAccountErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  postRegAccount(accountInfo: any) {
    let seq = this.api.post('conta', accountInfo, this.option).share();

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
