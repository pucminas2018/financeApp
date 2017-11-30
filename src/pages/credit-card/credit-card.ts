import { Item } from './../../models/item';
import { RegAccount } from './../reg-account/domain/reg-account';
import { ListCreditCardPage } from './../list-credit-card/list-credit-card';
import { Api } from './../../providers/api/api';
import { CreditCard } from './domain/credit-card';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User, CreditCards } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-credit-card',
  templateUrl: 'credit-card.html'
})

export class CreditCardPage {

  option: any = {"Content-Type":"application/json"}
  _user: any;
  creditCard: CreditCard = new CreditCard();
  contas: RegAccount[] = [];
  conta: RegAccount = new RegAccount();
  contaList: Item[] = [];

  private creditCardErrorString: string;
  private creditCardSucessString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public items: CreditCards,
    public translateService: TranslateService,
    public api: Api) {
    this.creditCard = navParams.get('item') || items.defaultItem;
      this.creditCardErrorString = "Erro ao salvar o cartão de crédito";
    this.creditCardSucessString = "Cartão de crédico salvo com sucesso!"
  }

  ionViewDidLoad() {
    this.conta.usuario = JSON.parse(localStorage.getItem('userLogged'));
    let seq = this.api.get('conta/todas/'+this.conta.usuario.codUsuario, this.option).share();
    
        seq.subscribe((res: any) => {
          if (res.status == 200) {
            this.contaList = JSON.parse(res._body);
          }
        }, err => {
          console.error('ERROR', err);
        });
  }


  doCreditCard() {
    this.postCreditCard(this.creditCard).subscribe((resp) => {
      this.navCtrl.push(ListCreditCardPage);
      let toast = this.toastCtrl.create({
        message: this.creditCardSucessString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }, (err) => {

      this.navCtrl.push(MainPage);

      let toast = this.toastCtrl.create({
        message: this.creditCardErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }

  postCreditCard(accountInfo: any) {
    let seq = this.api.post('cartao-credito', accountInfo, this.option).share();

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
