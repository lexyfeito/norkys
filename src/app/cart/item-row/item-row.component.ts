import {Component, Input, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items/items.service';
import {ItemModel} from '../../models/item.model';

@Component({
  selector: 'app-cart-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.scss']
})
export class ItemRowComponent implements OnInit {

  @Input() item: ItemModel;
  imageUrl: string;
  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.getObjectById(this.item.imageId)
      .subscribe(response => {
        this.imageUrl = response.object.image_data.url;
      });
  }

}
