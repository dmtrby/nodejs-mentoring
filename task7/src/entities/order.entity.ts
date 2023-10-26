import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Ref,
  ref,
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { User } from "./user.entity";
import { Cart } from "./cart.entity";
import { OrderItem } from "./orderItem.entity";
import { Delivery } from "./delivery.entity";
import { Payment } from "./payment.entity";

@Entity()
export class Order {
  @PrimaryKey()
  id: string = v4(); // tut nado sdelat kak-to one to many

  @ManyToOne(() => User)
  user: Ref<User>;

  @OneToOne(() => Cart)
  cart: Ref<Cart>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items = new Collection<OrderItem>(this);

  @OneToOne(() => Payment)
  payment: Ref<Payment>;

  @OneToOne(() => Delivery)
  delivery: Ref<Delivery>;

  @Property()
  comments!: string;

  @Property()
  status: string;

  @Property()
  total: number;

  constructor(
    user: User,
    cart: Cart,
    payment: Payment,
    delivery: Delivery,
    comments: string,
    total: number
  ) {
    this.cart = ref(cart);
    this.user = ref(user);
    this.payment = ref(payment);
    this.delivery = ref(delivery);
    this.comments = comments;
    this.status = "created";
    this.total = total;
  }
}
