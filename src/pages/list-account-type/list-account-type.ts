import { AccountType } from './../account-type/domain/account-type';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { AccountTypes } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-account-type',
  templateUrl: 'list-account-type.html'
})
export class ListAccountTypePage {
  accountType: AccountType = new AccountType();
  currentItems: Item[];
  option: any = {"Content-Type":"application/json"}
  _user: any;

  constructor(public navCtrl: NavController,  public items: AccountTypes, public modalCtrl: ModalController, public api: Api) {
  }

ionViewDidLoad() {
    this.accountType.usuario = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('tipo-conta/todos/'+this.accountType.usuario.codUsuario, this.option).share();
    
        seq.subscribe((res: any) => {
          if (res.status == 200) {
            this.currentItems = JSON.parse(res._body);
          }
        }, err => {
          console.error('ERROR', err);
        });
        return seq;
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('AccountTypePage');
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
    this.navCtrl.push('AccountTypePage', {
      item: item
    });
  }
}
