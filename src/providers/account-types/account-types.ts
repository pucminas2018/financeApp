import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class RegAccounts {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/tipo-conta', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
