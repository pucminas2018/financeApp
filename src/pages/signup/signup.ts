import { WelcomePage } from './../welcome/welcome';
import { FirstRunPage } from './../pages';
import { Api } from './../../providers/api/api';
import { Http } from '@angular/http';
import { Account } from './domain/account';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  account: Account = new Account();
  option: any = {"Content-Type":"application/json"}
  _user: any;

  private signupErrorString: string;
  private signupSucessString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    this.translateService.get('SIGNUP_SUCESS').subscribe((value) => {
      this.signupSucessString = value;
    })
  }

  doSignup() {
    this.postSignup(this.account).subscribe((resp) => {
      this.navCtrl.push(WelcomePage);
      let toast = this.toastCtrl.create({
        message: this.signupSucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postSignup(accountInfo: any) {
    let seq = this.api.post('usuario', accountInfo, this.option).share();

    seq.subscribe((res: any) => {
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
