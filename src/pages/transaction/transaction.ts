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
  
  private transactionErrorString: string;
  private transactionSucessString: string;

  constructor(public navCtrl: NavController, 
    public user: User, 
    public navParams: NavParams, 
    public items: Items,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api) {

      this.transaction = navParams.get('item') || items.defaultItem;
    this.transactionErrorString = "Erro ao salvar o lançamento.";
    this.transactionSucessString = "Lançamento salvo com sucesso.";
  }

  doTransaction() {
    this.transaction.dataTransacao = null;
    this.transaction.conta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.transaction.conta.tipoConta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.transaction.fatura.dataFechamentoFatura = null;
    this.transaction.fatura.dataPagamentoFatura = null;
    this.transaction.conta.tipoConta.codTipoConta = 1;
    this.transaction.fatura.codFatura = 1;
    console.log(JSON.stringify(this.transaction));
    this.postTransaction(this.transaction).subscribe((resp) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.transactionSucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }, (err) => {

      this.navCtrl.push(MainPage);

      let toast = this.toastCtrl.create({
        message: this.transactionErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postTransaction(accountInfo: any) {
    let seq = this.api.post('transacao', accountInfo, this.option).share();

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
