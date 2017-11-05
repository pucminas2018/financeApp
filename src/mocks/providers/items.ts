import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "codTransacao": 0,
    "valor": 0,
    "descricao": "",
    "dataTransacao": "",
    "tipoTransacao": "debito",       
    "categoria": {
      "codCategoria": 0,
      "descricao": "",
    },
    "fatura": {
  "codFatura": 0,
  "valorTotal": 0,
  "dataFechamentoFatura": "",
  "dataPagamentoFatura": "",
  "mesReferencia": 0

},
    "conta": {
      "codConta": 0,
      "tituloConta": "",
      "saldoInicial": 0,
      "incluirTelaPrincipal": true,
      "tipoConta": {
        "codTipoConta": 0,
        "descricao": "",
        "usuario": {}
      },
      "usuario": {
        "codUsuario": 0,
        "nomeUsuario": "",
        "senhaUsuario": "",
        "emailUsuario": ""
      }
    }
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
          "codCategoria": 1,
          "descricao": "Academia",
        },
        "fatura": {
      "codFatura": 19452,
      "valorTotal": 13.09,
      "dataFechamentoFatura": "2017-11-04",
      "dataPagamentoFatura": "2017-12-01",
      "mesReferencia": 2
    
  },
        "conta": {
          "codConta": 1,
          "tituloConta": "Bradesco",
          "saldoInicial": 150.00,
          "incluirTelaPrincipal": true,
          "tipoConta": {
            "codTipoConta": 1,
            "descricao": "Poupança",
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
          "codCategoria": 2,
          "descricao": "Academia",
        },
        "fatura": {
          "codFatura": 19452,
          "valorTotal": 13.09,
          "dataFechamentoFatura": "2017-11-04",
          "dataPagamentoFatura": "2017-12-01",
          "mesReferencia": 3
        
      },
        "conta": {
          "codConta": 2,
          "tituloConta": "Bradesco",
          "saldoInicial": 150.00,
          "incluirTelaPrincipal": true,
          "tipoConta": {
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
