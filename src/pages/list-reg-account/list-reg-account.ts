import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { RegAccounts } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-reg-acconut',
  templateUrl: 'list-reg-account.html'
})
export class ListRegAccountPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: RegAccounts, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  ionViewDidLoad() {
  }

  addItem() {
    let addModal = this.modalCtrl.create('RegAccountPage');
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
    this.navCtrl.push('RegAccountPage', {
      item: item
    });
  }
}
