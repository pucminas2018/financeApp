import { FirstRunPage, MainPage } from './../pages';
import { Login } from './domain/login';
import { WelcomePage } from './../welcome/welcome';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginUser: Login = new Login();

  _user: any;
  option: any = {"Content-Type":"application/json"}

  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  doLogin() {
    this.login(this.loginUser).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(LoginPage);
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  login(accountInfo: any) {
    let seq = this.api.getUser(accountInfo.email, accountInfo.senha, this.option).share();
    seq.subscribe((res: any) => {
      localStorage.setItem('userLogged', res._body);
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
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
