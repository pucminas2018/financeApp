import { Category } from './../category/domain/category';
import { Api } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Categories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-category',
  templateUrl: 'list-category.html'
})
export class ListCategoryPage {
  category: Category = new Category();
  currentItems: Item[];
  option: any = {"Content-Type":"application/json"}
  _user: any;

  constructor(public navCtrl: NavController,  public items: Categories, public modalCtrl: ModalController,public api: Api) {
  }

  ionViewDidLoad() {
    this.category.usuario = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('categoria/todas/'+this.category.usuario.codUsuario, this.option).share();
    
        seq.subscribe((res: any) => {
          if (res.status == 'success') {
            console.log(res);
            this._loggedIn(res);
          }
        }, err => {
          console.error('ERROR', err);
        });
    
        return seq;
  }

  addItem() {
    let addModal = this.modalCtrl.create('CategoryPage');
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
    this.navCtrl.push('CategoryPage', {
      item: item
    });
  }

  _loggedIn(resp) {
    console.log(resp);
  }
}
