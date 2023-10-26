import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
  ref,
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { User } from "./user.entity";
import { CartItem } from "./cartItem.entity";

@Entity()
export class Cart {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => User, { ref: true })
  user: Ref<User>;

  @Property()
  isDeleted: boolean = false;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items = new Collection<CartItem>(this);

  constructor(user: User, isDeleted: boolean) {
    this.user = ref(user);
    this.isDeleted = isDeleted;
  }
}
