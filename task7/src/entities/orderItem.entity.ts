import { Entity, Property, ManyToOne, PrimaryKeyType, Ref, ref } from "@mikro-orm/core";

import { Product } from "./product.entity";

import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @ManyToOne(() => Product, { primary: true, ref: true })
  product: Ref<Product>;

  @ManyToOne(() => Order, { primary: true, ref: true })
  order: Ref<Order>;

  @Property()
  count!: number;

  @Property()
  offeredPrice!: number; // price for checkout, to keep real product prices separately.

  [PrimaryKeyType]?: [number, number];

  constructor(
    order: Order,
    product: Product,
    offeredPrice: number,
    count: number
  ) {
    this.order = ref(order);
    this.product = ref(product);
    this.count = count;
    this.offeredPrice = offeredPrice;
  }
}
