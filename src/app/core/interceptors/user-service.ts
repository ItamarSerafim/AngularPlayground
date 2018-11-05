import { Injectable } from '@angular/core';
import { DexieService } from '../dexie.service';
import { Dexie } from 'dexie';
import { HttpRequest } from '@angular/common/http';

interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  table: Dexie.Table<User, number>;
  sort: {
    fieldName: String,
    sortDirection: String
  };
  page: {
    number: number,
    size: number
  };
  filter: [any];
  operators = ['eq', 'gt', 'lt', 'between', 'neq' ]; // TODO: make it bigger, with more options

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('users');
  }
  sendRequest( req: HttpRequest<any> ) {
    const sort = req.params.get('sort');
    // TODO: test if sort field is in this.table.schema.
    if ( sort ) {
      this.sort = {
        fieldName: sort[0],
        sortDirection: sort[1]
      };
    }

    const pageNumber = req.params.get('pageNumber')[0];
    const pageSize = req.params.get('pageSize')[0]; // TODO: Test non-existing param value
    if (pageNumber && pageSize) {
      this.page = {
        number: +pageNumber,
        size: +pageSize
      };
    }

    // TODO: send bad resquest response if filter doesn't conform to the right format
    const filters = req.params.get('filter').split(/\s*&\s*/g); // TODO: limit the size of filters
    let operator = (filters[0] || '' ).match(/\s+\w+\s+/)[0]; // warning: for now let's support only one filter
    operator = operator.trim();
    let fieldName;
    if (this.operators.includes(operator)) {
      fieldName = ((filters[0] || '').split(operator)[0] || '').trim(); // 'field eq value' returns 'field'
    }

    // var obj = {};
    // var theEntries2 = req.params.map.entries();
    // var iten;
    // while( iten = theEntries2.next().value) { console.log(iten);
    //   obj[iten.key] = iten.value;
    // };


  }

  'post'(req: HttpRequest<any>) {
    // return this.table.where().add(req.body);
  }

  'get'(req: HttpRequest<any>) {
    return this.table.toArray();
  }


  'put'(req: HttpRequest<any>) {
    // return this.table.update(id, data);
  }


  'delete'(req: HttpRequest<any>) {
    // return this.table.delete(id);
  }
}
