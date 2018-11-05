import { DexieService } from '../dexie.service';
import { Dexie } from 'dexie';
import { HttpRequest } from '@angular/common/http';

export class UserService {

  table: Dexie.Table<any, number>;
  private entityName: String;


  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('users');
  }

  sendRequest( req: HttpRequest<any> ) {
    let entity = req.url.split('/api/')[1];
    if (entity) {
      entity = entity.split('/')[0];
    }

req.method.toLowerCase()

  }

  'post'(req: HttpRequest<any>) {
    return this.table.add(req.body);
  }

  'get'(req: HttpRequest<any>) {
    return this.table.toArray();
  }


  'put'(req: HttpRequest<any>) {

  }


  'delete'(req: HttpRequest<any>) {

  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
