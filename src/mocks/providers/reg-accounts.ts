import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class RegAccounts {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "codConta": 405415,
        "tituloConta": "Bradesco",
        "saldoInicial": 8484.54,
        "incluirTelaPrincipal": true,
        "tipoConta": {
          "codTipoConta": 0,
          "descricao": "Conta Poupança",
          "usuario": {}
        },
        "usuario": {}
      },
      {
        "codConta": 8548594,
        "tituloConta": "Itaú",
        "saldoInicial": -756.54,
        "incluirTelaPrincipal": true,
        "tipoConta": {
          "codTipoConta": 0,
          "descricao": "Conta Corrente",
          "usuario": {}
        },
        "usuario": {}
      },
      {
        "codConta": 51665,
        "tituloConta": "Santander",
        "saldoInicial": 15415.54,
        "incluirTelaPrincipal": true,
        "tipoConta": {
          "codTipoConta": 0,
          "descricao": "Conta Poupança",
          "usuario": {}
        },
        "usuario": {}
      },
    ];
    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
