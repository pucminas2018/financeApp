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
  invoice: { dataFechamentoFatura: Date, dataPagamentoFatura: Date, valorTotal: number, mesReferencia: number} = {
    dataFechamentoFatura: new Date(),
    dataPagamentoFatura: new Date(),
    valorTotal: 0,
    mesReferencia: 0
  };

  // Our translated text strings
  private invoiceErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: Invoices,
    public translateService: TranslateService) {

      this.invoice = navParams.get('item') || items.defaultItem;
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.invoiceErrorString = value;
    })
  }

  doInvoice() {
    // Attempt to login in through our User service
    this.user.signup(this.invoice).subscribe((resp) => {
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
}
