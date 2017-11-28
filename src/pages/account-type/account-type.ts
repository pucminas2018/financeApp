import { ListAccountTypePage } from './../list-account-type/list-account-type';
import { Api } from './../../providers/api/api';
import { AccountType } from './domain/account-type';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, CreditCards } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-account-type',
  templateUrl: 'account-type.html'
})
export class AccountTypePage {
  accountType: AccountType;
  option: any = {"Content-Type":"application/json"}
  _user: any;

  private accountTypeErrorString: string;
  private accountTypeSuccessString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: CreditCards,
    public translateService: TranslateService,
    public api: Api) {

    this.accountType = navParams.get('item') || items.defaultItem;
      this.accountTypeErrorString = "Erro ao cadastra o tipo de conta. Verifique seus dados e tente novamente.";
      this.accountTypeSuccessString = "Cadastro de tipo de conta realizado com sucesso!";
  }

  doAccountTypePage() {
    this.accountType.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.postAccountType(this.accountType).subscribe((resp) => {
      let toast = this.toastCtrl.create({
        message: this.accountTypeSuccessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push(MainPage);

    }, (err) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.accountTypeErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postAccountType(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
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
