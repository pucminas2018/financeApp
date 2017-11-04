import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "codTransacao": 64,
        "valor": 10.00,
        "descricao": "Avaliação Física",
        "dataTransacao": "2017-09-28",
        "tipoTransacao": "credito",       
        "categoria": {
          "codCategoria": 8,
          "descricao": "Academia",
        },
        "conta": {
          "codConta": 4782,
          "tituloConta": "Bradesco",
          "saldoInicial": 150.00,
          "incluirTelaPrincipal": true,
          "tipo-conta": {
            "codTipoConta": 1,
            "descricao": "poupança",
            "usuario": {}
          },
          "usuario": {
            "codUsuario": 82850,
            "nomeUsuario": "Fulano da Silva",
            "senhaUsuario": "123456",
            "emailUsuario": "fulano@gmail.com"
          }
        }
      },
      {
        "codTransacao": 64,
        "valor": 10.00,
        "descricao": "Avaliação Física",
        "dataTransacao": "2017-09-28",
        "tipoTransacao": "debito",       
        "categoria": {
          "codCategoria": 8,
          "descricao": "Academia",
        },
        "conta": {
          "codConta": 4782,
          "tituloConta": "Bradesco",
          "saldoInicial": 150.00,
          "incluirTelaPrincipal": true,
          "tipo-conta": {
            "codTipoConta": 1,
            "descricao": "poupança",
            "usuario": {}
          },
          "usuario": {
            "codUsuario": 82850,
            "nomeUsuario": "Fulano da Silva",
            "senhaUsuario": "123456",
            "emailUsuario": "fulano@gmail.com"
          }
        }
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
