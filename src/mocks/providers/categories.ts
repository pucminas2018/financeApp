import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Categories {
  items: Item[] = [];

  defaultItem: any = {
    "codCategoria": 0,
    // "tipoTransacao": "DOC",
    "descricao": "",
    "usuario": {}
  };


  constructor() {
    let items = [
      {
        "codCategoria": 1,
        // "tipoTransacao": "DOC",
        "descricao": "Academia",
        "usuario": {}
      },
      {
        "codCategoria": 2,
         // "tipoTransacao": "DOC",
        "descricao": "Transporte",
        "usuario": {}
      },
      {
        "codCategoria": 3,
         // "tipoTransacao": "DOC",
        "descricao": "Alimentação",
        "usuario": {}
      },
      {
        "codCategoria": 4,
         // "tipoTransacao": "DOC",
        "descricao": "Faculdade",
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
