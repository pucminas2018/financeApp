import { Api } from './../../providers/api/api';
import { RegAccount } from './../reg-account/domain/reg-account';
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
  conta: RegAccount;
  option: any = {"Content-Type":"application/json"}

  constructor(public navCtrl: NavController, public items: RegAccounts, public modalCtrl: ModalController, public api: Api) {
  this.conta = new RegAccount();
  }

  ionViewDidLoad() {
    this.conta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('conta/todas/'+this.conta.usuario.codUsuario, this.option).share();
    
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
