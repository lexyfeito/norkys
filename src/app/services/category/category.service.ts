import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  dataStore: {
    categories: []
  };

  // tslint:disable-next-line:variable-name
  private _categories: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    this.dataStore = {
      categories: []
    };
    this._categories = new BehaviorSubject<any>([]);
  }

  get categories() {
    return this._categories.asObservable();
  }

  loadCategories() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(
        `${environment.api}catalog-list?types=CATEGORY`
      ).pipe(
        map((res: any) => res.result)
      ).subscribe(response => {
        if (response.objects) {
          this.dataStore.categories = response.objects;

        } else {
          this.dataStore.categories = [];
        }

        this._categories.next(this.dataStore.categories);
        resolve();
      });
    });
  }

  findCategoryId(categoryName) {
    const object: any = this.dataStore.categories.find((category: any) => {
      return category.category_data.name === categoryName;
    });

    return object.id;
  }
}
