import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
  ManyToOne,
  Reference,
  ref
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { Product } from "./product.entity";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem {
  @ManyToOne(() => Product, { primary: true, ref: true })
  product: Ref<Product>;

  @ManyToOne(() => Cart, { primary: true, ref: true })
  cart: Ref<Cart>;

  @Property()
  count!: number;

  constructor(count: number, cart: Cart, product: Product) {
    this.cart = ref(cart);
    this.product = ref(product);
    this.count = count;
  }
}
