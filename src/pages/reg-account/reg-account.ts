import { ListRegAccountPage } from './../list-reg-account/list-reg-account';
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
  option: any = { "Content-Type": "application/json" }
  _user: any;

  private regAccountErrorString: string;
  private regAccountSucessString: string;
  constructor(public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public items: RegAccounts,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

    this.regAccount = navParams.get('item') || items.defaultItem;
    this.regAccountErrorString = "Erro ao cadastrar uma conta. Verifique seus dados e tente novamente.";
    this.regAccountSucessString = "Conta cadastrada com sucesso!";
  }

  doRegAccount() {
    this.regAccount.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.regAccount.tipoConta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.regAccount.codConta = 0;
    this.postRegAccount(this.regAccount).subscribe((resp) => {

      let toast = this.toastCtrl.create({
        message: this.regAccountSucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push(ListRegAccountPage);

    }, (err) => {

      this.navCtrl.push(MainPage);

      let toast = this.toastCtrl.create({
        message: this.regAccountErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postRegAccount(accountInfo: any) {
    let seq = this.api.post('conta', accountInfo, this.option).share();

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
