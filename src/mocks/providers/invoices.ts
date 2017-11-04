import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Invoices {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
          "codFatura": 8744,
          "valorTotal": 58.09,
          "dataFechamentoFatura": "2017-11-04",
          "dataPagamentoFatura": "2017-12-01",
          "mesReferencia": 9
        
      },
      {
        "codFatura": 98454,
        "valorTotal": 5528.19,
        "dataFechamentoFatura": "2017-11-04",
        "dataPagamentoFatura": "",
        "mesReferencia": 5
      
    },
    {
      "codFatura": 19452,
      "valorTotal": 13.09,
      "dataFechamentoFatura": "2017-11-04",
      "dataPagamentoFatura": "2017-12-01",
      "mesReferencia": 1
    
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
