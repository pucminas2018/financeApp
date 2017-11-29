import { Api } from './../../providers/api/api';
import { Invoice } from './../invoice/domain/invoice';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Invoices } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-invoice',
  templateUrl: 'list-invoice.html'
})
export class ListInvoicePage {
  currentItems: Item[];
  option: any = {"Content-Type":"application/json"}
  invoice: Invoice;

  constructor(public navCtrl: NavController, public items: Invoices, public modalCtrl: ModalController, public api:Api) {
    this.invoice = new Invoice();
  }
  ionViewDidLoad() {
    this.invoice.cartaoCredito.conta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('fatura/'+this.invoice.cartaoCredito.conta.usuario.codUsuario+'/todas/', this.option).share();
    
        seq.subscribe((res: any) => {
          if (res.status == 200) {
            this.currentItems = JSON.parse(res._body);
          }
        }, err => {
          console.error('ERROR', err);
        });
        return seq;
  }

  addItem() {
    let addModal = this.modalCtrl.create('InvoicePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('InvoicePage', {
      item: item
    });
  }
}
