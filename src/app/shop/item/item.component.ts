import {Component, Input, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items/items.service';
import {ItemModel} from '../../models/item.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: ItemModel;
  imageUrl: string;

  constructor(private itemsService: ItemsService) {
  }

  ngOnInit() {
    if (this.item && this.item.imageId) {
      this.itemsService.getObjectById(this.item.imageId)
        .subscribe(response => {
          this.imageUrl = response.object.image_data.url;
        });
    }
  }

}
