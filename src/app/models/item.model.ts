export class ItemModel {
  id: string;
  imageId: string;
  categoryId: string;
  name: string;
  description: string;
  amount: number;
  currency: string

  constructor(object: any) {
    this.id = object.id;
    this.imageId = object.image_id;
    this.categoryId = object.item_data.category_id;
    this.name = object.item_data.name;
    this.description = object.item_data.description;
    this.amount = object.item_data.variations[0].item_variation_data.price_money.amount / 100;
    this.currency = object.item_data.variations[0].item_variation_data.price_money.currency;
  }
}
