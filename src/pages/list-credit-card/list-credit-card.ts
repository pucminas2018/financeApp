import { Account } from './../signup/domain/account';
import { Api } from './../../providers/api/api';
import { CreditCard } from './../credit-card/domain/credit-card';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { CreditCards } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-credit-cards',
  templateUrl: 'list-credit-card.html'
})
export class ListCreditCardPage {
  currentItems: Item[];
  creditCard: CreditCard;
  account: Account;
  option: any = {"Content-Type":"application/json"}

  constructor(public navCtrl: NavController, public items: CreditCards, public modalCtrl: ModalController,public api: Api) {
    this.creditCard = new CreditCard();
  }

  ionViewDidLoad() {
    this.account = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('cartao-credito/todos/'+this.account.codUsuario, this.option).share();
    
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
    let addModal = this.modalCtrl.create('CreditCardPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    this.items.delete(item);
  }

  openItem(item: Item) {
    this.navCtrl.push('CreditCardPage', {
      item: item
    });
  }
}
