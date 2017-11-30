import { AccountType } from './../account-type/domain/account-type';
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
  tipoContaList: AccountType[] =[];
  tipoConta:AccountType = new AccountType();

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
    this.regAccountErrorString = "Erro ao salvar a conta.";
    this.regAccountSucessString = "Conta salva com sucesso!";
  }

  ionViewDidLoad() {
    this.tipoConta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('tipo-conta/todos/'+this.tipoConta.usuario.codUsuario, this.option).share();
    
        seq.subscribe((res: any) => {
          if (res.status == 200) {
            this.tipoContaList = JSON.parse(res._body);
          }
        }, err => {
          console.error('ERROR', err);
        });
  }

  doRegAccount() {
    this.regAccount.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.regAccount.tipoConta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.regAccount.codConta = 0;
    this.postRegAccount(this.regAccount).subscribe((resp) => {

      this.navCtrl.push(ListRegAccountPage);
      let toast = this.toastCtrl.create({
        message: this.regAccountSucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
      

    }, (err) => {

      this.navCtrl.push(RegAccountPage);

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
