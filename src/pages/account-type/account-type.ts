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
      this.accountTypeErrorString = "Erro ao salvar o tipo de conta.";
      this.accountTypeSuccessString = "Tipo de conta salvo com sucesso!";
  }

  doAccountType() {
    this.accountType.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.postAccountType(this.accountType).subscribe((resp) => {
      let toast = this.toastCtrl.create({
        message: this.accountTypeSuccessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push(ListAccountTypePage);

    }, (err) => {
      this.navCtrl.push(AccountTypePage);
      let toast = this.toastCtrl.create({
        message: this.accountTypeErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postAccountType(accountInfo: any) {
    let seq = this.api.post('tipo-conta', accountInfo, this.option).share();

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
