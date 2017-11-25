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

  // Our translated text strings
  private invoiceErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: Invoices,
    public translateService: TranslateService,
    public api: Api) {

      this.invoice = navParams.get('item') || items.defaultItem;
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.invoiceErrorString = value;
    })
  }

  doInvoice() {
    // Attempt to login in through our User service
    this.postInvoice(this.invoice).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      let toast = this.toastCtrl.create({
        message: this.invoiceErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  postInvoice(accountInfo: any) {
    let seq = this.api.post('fatura', accountInfo, this.option).share();

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
