import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ItemModel} from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  dataStore: {
    items: ItemModel[]
  };
  // tslint:disable-next-line:variable-name
  private _items: BehaviorSubject<Array<any>>;

  constructor(private httpClient: HttpClient) {
    this.dataStore = {
      items: []
    };
    this._items = new BehaviorSubject<Array<any>>([]);
  }

  get items() {
    return this._items.asObservable();
  }

  loadItems(categoryId) {
    return new Promise(resolve => {
      this.httpClient.get(
        `${environment.api}catalog-search?object_types=ITEM&attribute_name=category_id&attribute_value=${categoryId}`
      ).pipe(
        map((res: any) => res.result && res.result.objects || []),
        map(objects => objects.map(object => new ItemModel(object)))
      ).subscribe((items: ItemModel[]) => {
        this.dataStore.items = items;
        this._items.next(this.dataStore.items);
        resolve();
      });
    });
  }

  getObjectById(objectId) {
    return this.httpClient.get(
      `${environment.api}catalog-object?objectId=${objectId}`
    ).pipe(
      map((res: any) => res.result)
    );
  }
}
