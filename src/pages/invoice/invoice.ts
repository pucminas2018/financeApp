import { AccountType } from './../account-type/domain/account-type';
import { Item } from './../../models/item';
import { Account } from './../signup/domain/account';
import { ListInvoicePage } from './../list-invoice/list-invoice';
import { CreditCard } from './../credit-card/domain/credit-card';
import { Api } from './../../providers/api/api';
import { InvoicePageModule } from './invoice.module';
import { Invoice } from './domain/invoice';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, Invoices } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})
export class InvoicePage {
  option: any = {"Content-Type":"application/json"}
  _user: any;
  invoice: Invoice = new Invoice();
  cartaoCredito: CreditCard = new CreditCard();
  account: Account
  optionsCardCredit: Item[]
  itens: any[];

  private invoiceErrorString: string;
  private invoiceSucessString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: Invoices,
    public translateService: TranslateService,
    public api: Api) {
      this.invoice = new Invoice();
      this.invoice = navParams.get('item') || items.defaultItem;
      this.invoiceErrorString = "Erro ao salvar a fatura.";
      this.invoiceSucessString = "Fatura salva com sucesso!";
  }

  ionViewDidLoad() {
    this.account = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('cartao-credito/todos/'+this.account.codUsuario, this.option).share();
    
        seq.subscribe((res: any) => {
          if (res.status == 200) {
            this.optionsCardCredit = JSON.parse(res._body);
          }
        }, err => {
          console.error('ERROR', err);
        });
  }

  doInvoice() {
    this.invoice.cartaoCredito = this.cartaoCredito;
    this.invoice.cartaoCredito.conta.tipoConta = new AccountType();
    this.invoice.cartaoCredito.conta.tipoConta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    this.invoice.cartaoCredito.conta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    localStorage.setItem('dataFechamento', this.invoice.dataFechamentoFatura.toString());
    localStorage.setItem('dataPagamento', this.invoice.dataPagamentoFatura.toString());
    this.invoice.dataFechamentoFatura = null;
    this.invoice.dataPagamentoFatura = null;
    this.postInvoice(this.invoice).subscribe((resp) => {
      this.navCtrl.push(ListInvoicePage);
      let toast = this.toastCtrl.create({
        message: this.invoiceSucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }, (err) => {

      this.navCtrl.push(MainPage);

      let toast = this.toastCtrl.create({
        message: this.invoiceErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postInvoice(accountInfo: any) {
    let seq = this.api.post('fatura', accountInfo, this.option).share();

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
