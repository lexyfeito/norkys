import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemsService} from '../services/items/items.service';
import {ItemModel} from '../models/item.model';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../services/cart/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  order: FormGroup;
  itemId: string;
  item: ItemModel;
  imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.order = this.fb.group({
      size: ['md', Validators.required],
      qty: [1, Validators.required]
    });
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if (params) {
      this.itemId = params.id;

      this.itemsService.getObjectById(this.itemId)
        .pipe(
          map(response => new ItemModel(response.object))
        )
        .subscribe((item) => {
          this.item = item;
          this.itemsService.getObjectById(this.item.imageId).subscribe(imageResponse => {
            this.imageUrl = imageResponse.object.image_data.url;
          });
        });
    }
  }

  addToCart() {
    this.cartService.addItem(this.item);
  }

}
