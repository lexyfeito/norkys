import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../services/category/category.service';
import {Observable} from 'rxjs';
import {ItemsService} from '../services/items/items.service';
import {ItemModel} from '../models/item.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  selectedCategory: string;
  categories: Observable<Array<any>>;
  items: Observable<Array<ItemModel>>;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private itemsService: ItemsService
  ) {
    this.categories = this.categoryService.categories;
    this.items = this.itemsService.items;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: {category}) => {
      if (params && params.category) {
        this.selectedCategory = params.category;
      } else {
        this.selectedCategory = undefined;
      }
      this.loadItems();
    });
  }

  private async loadItems() {
    const categoryId = this.categoryService.findCategoryId(this.selectedCategory);
    await this.itemsService.loadItems(categoryId);
  }

}
