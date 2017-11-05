import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class CreditCards {
  items: Item[] = [];

  defaultItem: any = {
      "codCartaoCredito": 0,
      "descricao": "",
      "limite": 0,
      "operadora": "",
      "conta":{
        "codConta": 0,
        "tituloConta": "",
        "saldoInicial": 0,
        "incluirTelaPrincipal": true,
        "tipoConta": {
          "codTipoConta": 0,
          "descricao": "",
          "usuario": {}
        },
        "usuario": {}
      },
      "usuario": {}
  };


  constructor() {
    let items = [
      {
        "codCartaoCredito": 1,
        "descricao": "Nubank",
        "limite": 7890,
        "operadora": "Visa",
        "conta":{
          "codConta": 3,
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
        "usuario": {}
      },
      {
        "codCartaoCredito": 2,
        "descricao": "Inter",
        "limite": 500,
        "operadora": "Mastercard",
        "conta":{
          "codConta": 1,
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
        "usuario": {}
      },
      {
        "codCartaoCredito": 3,
        "descricao": "Cartão Caixa",
        "limite": 2.78,
        "operadora": "Elo",
        "conta":{
          "codConta": 2,
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
